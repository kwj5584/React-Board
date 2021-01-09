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
} from './types'

export function loginUser(dataTosubmit){
    const request = axios.post('/api/users/login',dataTosubmit)
    .then(res =>res.data)

    return {
        type:LOGIN_USER,
        payload : request
    }
}
export function registerUser(dataToSubmit){
    const request = axios.post('/api/users/register', dataToSubmit)
    .then(res=>res.data)
    
    return{
        type:REGISTER_USER,
        payload:request
    }
}

export function auth(){
    const request = axios.get('/api/users/auth')
    .then(res=>res.data)

    return{
        type:AUTH_USER,
        payload:request
    }
}

export function listAdd(dataToSubmit){
    const request = axios.post('/api/boards/add',dataToSubmit)
    .then(res=>res.data)

    return{
        type:LIST_ADD,
        payload:request
    }
}

export function getList(){
    const request = axios.get('/api/boards/getList')
    .then(res=>res.data)

    return{
        type:GET_LIST,
        payload:request
    }
}

export function getDetail(dataToSubmit){
    // console.log('action detiailApi:',dataToSubmit)
    const request = axios.post('/api/boards/getDetail', dataToSubmit)
    .then(res=>res.data)

    return{
        type:GET_DETAIL,
        payload:request
    }
}

export function listUpdate(dataTosubmit){
    const request = axios.patch('/api/boards/update',dataTosubmit)
    .then(res=>res.data)

    return{
        type:LIST_UPDATE,
        payload:request
    }
}

export function listDelete(dataToSubmit){
    console.log('deleteaction',dataToSubmit)
    const request = axios.delete('/api/boards/delete', {data:{_id:dataToSubmit}})
    .then(res=>res.data)

    return{
        type:LIST_DELETE,
        payload:request
    }
}