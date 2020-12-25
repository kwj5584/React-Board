import axios from 'axios';
import {
    LOGIN_USER
} from './types'

export function loginUser(dataTosubmit){
    const request = axios.post('/api/users/login',dataTosubmit)
    .then(res =>res.data)

    return {
        type:LOGIN_USER,
        payload : request
    }
}