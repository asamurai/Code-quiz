import {
    USER_SIGNIN,
    USER_SIGNOUT,
    USER_REGISTER
} from './../constants';

const initialState = {
    loading: false,
    error: null,
    data: null,
    loggedIn: false
};

export default function (state = initialState, action){
    switch (action.type) {
        case USER_SIGNIN.REQUEST: 
        case USER_SIGNOUT.REQUEST:
        case USER_REGISTER.REQUEST:
            return {...state, error: null, loading: true};
            break;
        case USER_SIGNIN.SUCCESS:
            return {...state, error: null, loading: false, data: action.data, loggedIn: true};
            break;
        case USER_SIGNOUT.SUCCESS: 
            return {...state, error: null, loading: false, data: null, loggedIn: false};
            break;
        case USER_REGISTER.SUCCESS: 
            return {...state, error: null, loading: false};
            break;
        case USER_SIGNIN.ERROR: 
        case USER_SIGNOUT.ERROR:
        case USER_REGISTER.ERROR:
            return {...state, error: action.error, loading: false};
            break;  
        default:
            return state;
            break;
    }
}


