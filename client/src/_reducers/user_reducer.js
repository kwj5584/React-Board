import {
    LOGIN_USER, REGISTER_USER, AUTH_USER, LIST_ADD, GET_LIST, GET_DETAIL
} from '../_actions/types';

const Reducer = (state = {},action) =>{
    switch (action.type){
        case LOGIN_USER:
            return{...state, loginSuccess: action.payload}
            break;

        case REGISTER_USER:
            return {...state, register : action.payload}
            break;

        case AUTH_USER:
            return{ ...state, userData : action.payload}
            break;

        case LIST_ADD:
            return{ ...state, listData : action.payload}      
            break; 

        case GET_LIST:
            return{ ...state, getList: action.payload}
            break;

        case GET_DETAIL:
            return{ ...state, getDetail: action.payload}
            break;

        default:
            return state;
    }
}
export default Reducer;