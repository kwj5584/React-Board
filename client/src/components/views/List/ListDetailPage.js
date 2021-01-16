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
    const loginUser = props.location.state.name; // Landing Page에서 받아오는 props. 수정 할 때 비교필요
    const _id = props.location.state._id
    console.log('listdetailpage:',_id)
    const dispatch = useDispatch();
    const readOnly = true; // editor 읽기 전용
    
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
    },[dispatch,_id]) // 세부내용 불러오는 액션함수 호출 한 뒤 제목, 작성자, 내용 setState
    
    const htmlToEditor = contents
    const blocksFromHtml = htmlToDraft(htmlToEditor);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    const editorState = EditorState.createWithContent(contentState); // html태그로 작성된 contents를 tag제외해주는 작업

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
    }   // 게시글의 작성자와 로그인 한 유저의 값이 같아야만 수정가능.
        // 수정 할 시 modify페이지로 고유 id, 작성자, 제목, 내용 정보를 props로 보내줌
    const onDeleteHandler= ()=>{
        if(loginUser !== userName){
            alert('작성자만 삭제할 수 있습니다.')
        }else{
            let body = {_id:_id}
            dispatch(listDelete(body))
            .then((res)=>{
                if(res.payload.deleteSuccess){
                    props.history.push('/')
                }else{
                    alert('삭제 실패')
                }
            })
        }
    } // 작성자와 로그인정보가 같으면 listDelete 액션함수 호출 삭제 성공하면 LandingPage로 라우팅

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