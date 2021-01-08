import React,{useEffect,useState,useRef} from 'react';
import {useDispatch} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getDetail} from '../../../_actions/user_action'
import {Button} from 'react-bootstrap'

import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {EditorState, convertToRaw, ContentState } from 'draft-js'
import htmlToDraft from 'html-to-draftjs'

function ListDetailPage(props){
    const _id = props.location.state._id
    // console.log('listdetailpage:',_id)
    const dispatch = useDispatch();
    const readOnly = true;
    
    const [detailInfo, setDetailInfo] = useState([])
    const [contents,setContents] = useState('')
    let body = {_id:_id}
    
    useEffect(()=>{
        dispatch(getDetail(body))
        .then((res=>{
            console.log('listdetailpage',res.payload[0])
            setDetailInfo(res.payload)
            setContents(res.payload[0].contents)
        }))
    },[dispatch])
    
    const htmlToEditor = contents
    

    const blocksFromHtml = htmlToDraft(htmlToEditor);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    const editorState = EditorState.createWithContent(contentState);

    const back = ()=>{
        props.history.push('/')
    }
    
    return(
        <>
        <div>
            {detailInfo.map((data)=>
                <div>
                <h3>제목:{data.title}</h3>
                <h4>작성자:{data.userName}</h4>
                <Editor
                    readOnly={readOnly}
                    editorState={editorState}
                >
                </Editor>     
                </div>
            )}
            <br/>
            <Button onClick={back}>목록으로</Button>
        </div>
        </>
    )
}

export default withRouter(ListDetailPage);
