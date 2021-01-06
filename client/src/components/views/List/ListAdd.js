import React,{useState} from 'react';
import {Editor} from 'react-draft-wysiwyg';

import {Button} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import {withRouter} from 'react-router-dom'
import styled from 'styled-components'
import {listAdd} from '../../../_actions/user_action'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {convertToRaw, EditorState} from 'draft-js';
import draftToHtml from 'draftjs-to-html'

function ListAdd(props){
    
    const MyBlock = styled.div`
    .wrapper-class{
        width: 50%;
        margin: 0 auto;
        margin-bottom: 4rem;
    }
    .editor {
    height: 600px;
    border: 1px solid #f1f1f1 !important;
    padding: 5px !important;
    border-radius: 2px !important;
    }
`;
    const userName = props.location.state.name
    console.log('listaddpage :', userName)

    const dispatch = useDispatch();
    
    const [title, setTitle] = useState("")
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const editorToHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    
    const onTitleHandler = (event) =>{
        setTitle(event.currentTarget.value)
    }
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
        console.log('listaddPage :',body)
        dispatch(listAdd(body))
        .then(res=>{
            if(res.payload.submit){
                props.history.push('/')
            }else{
                alert("작성 실패")
            }
        })
    }
}
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
         {/* <div> */}
        
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
        <Button onClick={onSubmitHandler}>등록</Button>
        <Button onClick={onResetHandler}>취소</Button>
        {/* </div> */}
        </MyBlock>
        </>
    )
}

export default withRouter(ListAdd);
