import {
    LOGIN_USER, REGISTER_USER
} from '../_actions/types';

const Reducer = (state = {},action) =>{
    switch (action.type){
        case LOGIN_USER:
            return{...state, loginSuccess: action.payload}
            break;

        case REGISTER_USER:
            return {...state, register : action.payload}
            break;

        default:
            return state;
    }
}
export default Reducer;