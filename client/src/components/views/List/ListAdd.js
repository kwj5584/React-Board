import React,{useState} from 'react';
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft';
import {Button} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import {withRouter} from 'react-router-dom'

function ListAdd(props){
    const userName = props.location.state.name
    console.log('listaddpage :', userName)

    const dispatch = useDispatch();
    const [title, setTitle] = useState('')
    const [editorState, setEditorState] = useState(()=>EditorState.createEmpty(),)

    let body = {
        title : title,
        userName:userName,
        contents : editorState
    }
    const onTitleHandler = (event) =>{
        setTitle(event.currentTarget.value)
    }
    const onSubmitHandler = () =>{
        dispatch()
    }
    return (
    <div>
        <textarea value={title} placeholder='제목 :' onChange={onTitleHandler} />
        <Editor editorState = {editorState} onChange={setEditorState} />
        <Button onClick={onSubmitHandler}>등록</Button>
    </div>
    )
}

export default withRouter(ListAdd);
