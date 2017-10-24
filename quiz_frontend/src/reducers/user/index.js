import * as userTypes from './../../constants/user';

const types = {
    ...userTypes
};

const initialState = {
    loading: false,
    error: null,
    data: { name: 'Artem' },
    formState: {
        edit: false,
        view: true,
    },
    loggedIn: true
};

export default function (state = initialState, action){
    switch (action.type) {
        case types.USER_SIGNIN.REQUEST: 
        case types.USER_SIGNOUT.REQUEST:
        case types.USER_REGISTER.REQUEST:
            return {...state, error: null, loading: true};
        case types.USER_SIGNIN.SUCCESS:
            return {...state, error: null, loading: false, data: action.data, loggedIn: true};
        case types.USER_SIGNOUT.SUCCESS: 
            return {...state, error: null, loading: false, data: null, loggedIn: false};
        case types.USER_REGISTER.SUCCESS: 
            return {...state, error: null, loading: false};
        case types.USER_SIGNIN.ERROR: 
        case types.USER_SIGNOUT.ERROR:
        case types.USER_REGISTER.ERROR:
            return {...state, error: action.error, loading: false};
        case types.CHANGE_FORM_EDIT_STATE:
            return { ...state, formState: { edit: action.state, view: !action.state } };
        case types.CHANGE_FORM_VIEW_STATE:
            return { ...state, formState: { view: action.state, edit: !action.state } };
        default:
            return state;
    }
}


