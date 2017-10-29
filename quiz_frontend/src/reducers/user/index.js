import * as userTypes from './../../constants/user';

const types = {
    ...userTypes
};

const initialState = {
    loading: false,
    error: null,
    data: { id: 1, name: 'Artem' },
    formState: {
        edit: false,
        view: true
    },
    modals: {
        imageUpload: false,
    },
    loggedIn: true
};

export default function (state = initialState, action){
    switch (action.type) {
        case types.USER_SIGNIN.REQUEST: 
        case types.USER_SIGNOUT.REQUEST:
        case types.USER_REGISTER.REQUEST:
        case types.USER_UPDATE.REQUEST:
        case types.USER_PASSWORD_CHANGE.REQUEST:
        case types.USER_EMAIL_CHANGE.REQUEST:
            return {...state, error: null, loading: true};
        case types.USER_SIGNIN.SUCCESS:
            return {...state, error: null, loading: false, data: action.data, loggedIn: true};
        case types.USER_SIGNOUT.SUCCESS: 
            return {...state, error: null, loading: false, data: null, loggedIn: false};
        case types.USER_REGISTER.SUCCESS: 
            return {...state, error: null, loading: false};
        case types.USER_UPDATE.SUCCESS:
            return { ...state, data: action.data, loading: false, error: null };
        case types.USER_SIGNIN.ERROR: 
        case types.USER_SIGNOUT.ERROR:
        case types.USER_REGISTER.ERROR:
        case types.USER_UPDATE.ERROR:
        case types.USER_EMAIL_CHANGE.ERROR:
        case types.USER_PASSWORD_CHANGE.ERROR:
            return {...state, error: action.error, loading: false};
        case types.CHANGE_USER_PROFILE_FORM_EDIT_STATE:
            return { ...state, formState: { edit: action.state, view: !action.state } };
        case types.CHANGE_USER_PROFILE_FORM_VIEW_STATE:
            return { ...state, formState: { view: action.state, edit: !action.state } };
        case types.CHANGE_USER_PROFILE_FORM_MODAL_STATE:
            return { ...state, modals: { ...state.modals, ...action.modalState } };
        case types.RESET_USER_ERRORS: 
            return { ...state, error: null };
        default:
            return state;
    }
}


