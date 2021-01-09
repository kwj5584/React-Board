import React,{useEffect,useState} from 'react';
import {useDispatch} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getDetail} from '../../../_actions/user_action'
import {Button} from 'react-bootstrap'
import styled from 'styled-components'

import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {EditorState, ContentState } from 'draft-js'
import htmlToDraft from 'html-to-draftjs'

import {listDelete} from '../../../_actions/user_action'

function ListDetailPage(props){
    const loginUser = props.location.state.name;
    const _id = props.location.state._id
    console.log('listdetailpage:',_id)
    const dispatch = useDispatch();
    const readOnly = true;
    
    const [title,setTitle] = useState('')
    const [userName,setUserName] = useState('')
    const [contents,setContents] = useState('')
    
    
    useEffect(()=>{
        let body = {_id:_id}
        dispatch(getDetail(body))
        .then((res=>{
            // console.log('listdetailpage',res.payload[0])
            setTitle(res.payload[0].title)
            setUserName(res.payload[0].userName)
            setContents(res.payload[0].contents)
        }))
    },[dispatch,_id])
    
    const htmlToEditor = contents
    const blocksFromHtml = htmlToDraft(htmlToEditor);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    const editorState = EditorState.createWithContent(contentState);

    const back = ()=>{
        props.history.push('/')
    }

    const onModifyHandler = ()=>{
        if(loginUser !== userName){
            alert('작성자만 수정할 수 있습니다.')
        }else{
        props.history.push({
            pathname:'/modify',
            state:{ userId: _id, loginUser:loginUser, title:title, contents:contents }
        })
    }
    }
    const onDeleteHandler= ()=>{
        if(loginUser !== userName){
            alert('작성자만 삭제할 수 있습니다.')
        }else{
            let body = {_id:_id}
            // alert(body)
            dispatch(listDelete(body))
            .then((res)=>{
                if(res.payload.deleteSuccess){
                    props.history.push('/')
                }else{
                    alert('삭제 실패')
                }
            })
        }
    }
    const MyBlock = styled.div`
    .editor {
    height: 600px;
    border: 1px solid #f1f1f1 !important;
    padding: 5px !important;
    border-radius: 2px !important;
    }
`;
    return(
        <>
        <MyBlock>
                <div>
                <h3>제목:{title}</h3>
                <h4>작성자:{userName}</h4>
                <Editor
                    editorClassName='editor'
                    readOnly={readOnly}
                    editorState={editorState}
                >
                </Editor>
                </div>
            <br/>
            <Button onClick={back}>목록으로</Button>
            <Button onClick={onModifyHandler}>수정</Button>
            <Button onClick={onDeleteHandler}>삭제</Button>
        </MyBlock>
        </>
    )
}

export default withRouter(ListDetailPage);
