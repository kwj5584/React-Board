import React,{useState,useEffect,useRef} from 'react';
import {withRouter} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {getDetail} from '../../../_actions/user_action'
import {Button} from 'react-bootstrap'
import styled from 'styled-components'


import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {convertToRaw, EditorState, ContentState} from 'draft-js';
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'

import {listUpdate} from '../../../_actions/user_action'

function ListModify(props){
    const userId = props.location.state.userId
    const userName = props.location.state.loginUser
    console.log('modifypage:',userName)
    const [title,setTitle] = useState('')
    const [contents,setContents] = useState('') // 수정 전 Contents state
    
    let body = {_id:userId}
    const dispatch = useDispatch();
    // const [detailInfo, setDetailInfo] = useState([]) // userName, title state
    
    useEffect(()=>{
        dispatch(getDetail(body))
        .then((res=>{
            // console.log('listdetailpage',res.payload[0])
            setTitle(res.payload[0].title)
            setContents(res.payload[0].contents)
        }))
    },[dispatch])
    
    // get해서 받아온 메세지 태그 삭제 
    const htmlToEditor = contents
    const blocksFromHtml = htmlToDraft(htmlToEditor);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    
    const [editorState, setEditorState] = useState(EditorState.createWithContent(contentState))
    console.log('123',editorState)
    // end

    // Editor로 입력한 문자 변환
    const editorToHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    // end 
    const onTitleHandler = (event)=>{
        setTitle(event.currentTarget.value)
    }

    const onEditorStateChange = (editorState)=>{
        setEditorState(editorState)
    }
    const MyBlock = styled.div`
    .editor {
    height: 600px;
    border: 1px solid #f1f1f1 !important;
    padding: 5px !important;
    border-radius: 2px !important;
    }
`;  
    const onResetHandler = ()=>{
        props.history.push('/')
    }
    const onUpdateHandler = ()=>{
        let dataList = {
            _id:userId,
            title:title,
            userName:userName,
            contents:editorToHtml
        }
        dispatch(listUpdate(dataList))
        .then(res=>{
            if(res.payload.updateSuccess){
                props.history.push('/')
            }
            else{
                alert('작성실패')
            }
        })
    }
    return(
        <>
            
            <div>
                <label>제목 :</label>
                <input type='text' value={title} onChange={onTitleHandler}/>
            </div>
            <MyBlock>
                <Editor
                    editorClassName='editor'
                    value='test'
                    editorState={editorState}
                    onEditorStateChange={onEditorStateChange}
                >
                </Editor>
            <br/>
            <Button onClick={onResetHandler}>목록으로</Button>
            <Button onClick={onUpdateHandler}>수정완료</Button>
        </MyBlock>
        </>
    )
}
export default withRouter(ListModify)