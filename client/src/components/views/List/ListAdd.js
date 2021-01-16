import React,{useState} from 'react';
import {listAdd} from '../../../_actions/user_action'
import {useDispatch} from 'react-redux'
import {withRouter} from 'react-router-dom'

import {Button} from 'react-bootstrap'
import styled from 'styled-components'


import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {convertToRaw, EditorState} from 'draft-js';
import draftToHtml from 'draftjs-to-html'


function ListAdd(props){
    
    const MyBlock = styled.div`
    .editor {
    height: 600px;
    border: 1px solid #f1f1f1 !important;
    padding: 5px !important;
    border-radius: 2px !important;
    }
`;

    const userName = props.location.state.name // LandingPage에서 props로 뿌려준 로그인한 유저. 게시글 작성 때 필요

    const dispatch = useDispatch();
    
    const [title, setTitle] = useState("") // title state
    const [editorState, setEditorState] = useState(EditorState.createEmpty('')); // contents state
    const editorToHtml = draftToHtml(convertToRaw(editorState.getCurrentContent())); // draft로 임포트한 editor를 html태그로 변환해주는 함수
    
    const onTitleHandler = (event) =>{
        setTitle(event.currentTarget.value)
    } // 제목 설정
    const onEditorStateChange = (editorState) => {
        // editorState에 값 설정
    setEditorState(editorState);
    };
    
    const onSubmitHandler = (event) =>{
        event.preventDefault();
        if(title ===''|| editorToHtml ===''){
            return alert('제목과 내용은 공백이 안됩니다.')
        }
        else{
        let body = {
            title : title,
            userName:userName,
            contents :editorToHtml
        }
        dispatch(listAdd(body))
        .then(res=>{
            if(res.payload.submit){
                props.history.push('/')
            }else{
                alert("작성 실패")
            }
        })
    }
} // 작성 버튼 클릭 시 제목 혹은 내용에 공백 여부 판단 및 공백 없으면 
    //제목과 내용 그리고 작성자를 body로 묶어 listAdd action함수로 dispatch
    const onResetHandler = ()=>{
        props.history.push('/')
    }
    return (
        <>
        <div>
            <label>제목:  </label>
        <input type='text' value={title} onChange={onTitleHandler} />
        </div>
        <MyBlock>
        <Editor 
        editorState = {editorState} 
        editorClassName='editor'
        onEditorStateChange={onEditorStateChange}
        toolbar={{
            // inDropdown: 해당 항목과 관련된 항목을 드롭다운으로 나타낼것인지
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: false },
        }} 
        placeholder="내용을 작성해주세요."
        // 한국어 설정
        localization={{
        locale: 'ko',
        }}
        />
        <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
        <Button onClick={onSubmitHandler}>등록</Button>
        <Button onClick={onResetHandler}>취소</Button>
        </div>
        </MyBlock>
        </>
    )
}

export default withRouter(ListAdd);
