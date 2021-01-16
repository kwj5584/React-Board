import axios from 'axios';

import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LIST_ADD,
    GET_LIST,
    GET_DETAIL,
    LIST_UPDATE,
    LIST_DELETE,
    FIND_TITLE,
    FIND_USERNAME
} from './types'

export function loginUser(dataTosubmit){
    const request = axios.post('/api/users/login',dataTosubmit) 
    .then(res =>res.data)
    // login Api로 로그인 정보 담아서 보냄
    return {
        type:LOGIN_USER,
        payload : request
    }
}
export function registerUser(dataToSubmit){
    const request = axios.post('/api/users/register', dataToSubmit)
    .then(res=>res.data)
    // register Api로 회원가입 정보 담아서 보냄
    return{
        type:REGISTER_USER,
        payload:request
    }
}

export function auth(){
    const request = axios.get('/api/users/auth')
    .then(res=>res.data)
    // auth APi로 인증이 되어있는지 값 호출
    return{
        type:AUTH_USER,
        payload:request
    }
}

export function listAdd(dataToSubmit){
    const request = axios.post('/api/boards/add',dataToSubmit)
    .then(res=>res.data)
    // add Api로 게시글 정보 담아서 보냄
    return{
        type:LIST_ADD,
        payload:request
    }
}

export function getList(){
    const request = axios.get('/api/boards/getList')
    .then(res=>res.data)
    // getList Api로 작성된 게시글 리스트 호출
    return{
        type:GET_LIST,
        payload:request
    }
}

export function getDetail(dataToSubmit){
    const request = axios.post('/api/boards/getDetail', dataToSubmit)
    .then(res=>res.data)
    // getDetail Api로 게시글 id값 담아서 보냄
    return{
        type:GET_DETAIL,
        payload:request
    }
}

export function listUpdate(dataTosubmit){
    const request = axios.patch('/api/boards/update',dataTosubmit)
    .then(res=>res.data)
    // update Api로 수정한 게시글담아서 보냄
    return{
        type:LIST_UPDATE,
        payload:request
    }
}

export function listDelete(dataToSubmit){
    console.log('delet_eaction',dataToSubmit)
    const request = axios.delete('/api/boards/delete', {data:{_id:dataToSubmit}})
    .then(res=>res.data)
    // delete Api로 고유id값 담아서 보냄
    return{
        type:LIST_DELETE,
        payload:request
    }
}

export function findTitle(dataToSubmit){
    const request = axios.post('/api/boards/findTitle',{data: dataToSubmit})
    .then(res=>res.data)
    // findTitle Api로 찾고자하는 title 담아서 보냄
    return{
        type:FIND_TITLE,
        payload:request
    }
}

export function findUserName(dataToSubmit){
    const request = axios.post('/api/boards/findUserName',{data:dataToSubmit})
    .then(res=>res.data)
    // findUserName Api로 찾고자하는 userName 담아서 보냄
    return{
        type:FIND_USERNAME,
        payload:request
    }
}