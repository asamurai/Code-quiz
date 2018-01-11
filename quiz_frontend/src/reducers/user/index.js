import {
    combineReducers
} from 'redux';

import * as userTypes from './../../constants/container_constants/user';

const types = {
    ...userTypes
};

const initialState = {
    loading: false,
    error: null,
    role: null,
    token: null,
    data: null,
    forms: {
        profile: {
            state: {
                edit: false,
                view: true
            },
            modals: {
                imageUpload: false,
            },
        },
        settings: {
        },
        statistics: {
            register: [],
            requestBody: {
                limit: 10
            },
            pages: {
                currentPage: 0,
                totalFinded: 0
            },
            statistic: null
        }
    },
    loggedIn: false
};

const error = (state = initialState.error, action) => {
    switch (action.type) {
        case types.USER_SIGNIN.REQUEST: 
        case types.USER_SIGNOUT.REQUEST:
        case types.USER_REGISTER.REQUEST:
        case types.USER_UPDATE.REQUEST:
        case types.USER_PASSWORD_CHANGE.REQUEST:
        case types.USER_EMAIL_CHANGE.REQUEST:
        case types.USER_SIGNIN.SUCCESS:
        case types.USER_SIGNOUT.SUCCESS:
        case types.USER_REGISTER.SUCCESS:
        case types.USER_UPDATE.SUCCESS:
            return null;
        case types.USER_SIGNIN.FAILURE: 
        case types.USER_SIGNOUT.FAILURE:
        case types.USER_REGISTER.FAILURE:
        case types.USER_UPDATE.FAILURE:
        case types.USER_EMAIL_CHANGE.FAILURE:
        case types.USER_PASSWORD_CHANGE.FAILURE:
            return action.error;
        default:
            return state;
    }
};

const loading = (state = initialState.loading, action) => {
    switch (action.type) {
        case types.USER_SIGNIN.REQUEST: 
        case types.USER_SIGNOUT.REQUEST:
        case types.USER_REGISTER.REQUEST:
        case types.USER_UPDATE.REQUEST:
        case types.USER_PASSWORD_CHANGE.REQUEST:
        case types.USER_EMAIL_CHANGE.REQUEST:
            return true;
        case types.USER_SIGNIN.SUCCESS:
        case types.USER_SIGNOUT.SUCCESS: 
        case types.USER_REGISTER.SUCCESS:
        case types.USER_UPDATE.SUCCESS:
        case types.USER_SIGNIN.FAILURE: 
        case types.USER_SIGNOUT.FAILURE:
        case types.USER_REGISTER.FAILURE:
        case types.USER_UPDATE.FAILURE:
        case types.USER_EMAIL_CHANGE.FAILURE:
        case types.USER_PASSWORD_CHANGE.FAILURE:
            return false;
        default:
            return state;
    }
};

const role = (state = initialState.role, action) => {
    switch (action.type) {
        // case types.USER_SIGNIN.SUCCESS:
            // return action.role;
        default:
            return state;
    }
};

const token = (state = initialState.token, action) => {
    switch (action.type) {
        case types.USER_SIGNIN.SUCCESS:
        case types.SET_EXISTING_USER_DATA:
            return action.token;
        default:
            return state;
    }
};

const data = (state = initialState.data, action) => {
    switch (action.type) {
        case types.USER_SIGNIN.SUCCESS:
        case types.USER_UPDATE.SUCCESS:
        case types.SET_EXISTING_USER_DATA:
            return action.data;
        case types.USER_SIGNOUT.SUCCESS: 
            return null;
        default:
            return state;
    }
};

const forms = (state = initialState.forms, action) => {
    switch (action.type) {
        case types.CHANGE_USER_PROFILE_FORM_EDIT_STATE:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    state: {
                        edit: action.state,
                        view: !action.state
                    }
                }
            };
        case types.CHANGE_USER_PROFILE_FORM_VIEW_STATE:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    state: {
                        edit: !action.state,
                        view: action.state
                    }
                }
            };
        case types.CHANGE_USER_PROFILE_FORM_MODAL_STATE:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    modals: {
                        ...state.profile.modals,
                        ...action.modalState
                    }
                }
            };
        default:
            return state;
    }
};

const loggedIn = (state = initialState.loggedIn, action) => {
    switch (action.type) {
        case types.USER_SIGNIN.SUCCESS:
        case types.SET_EXISTING_USER_DATA:
            return true;
        case types.USER_SIGNOUT.SUCCESS: 
            return false;
        default:
            return state;
    }
};

export default combineReducers({
    error,
    loading,
    role,
    data,
    forms,
    loggedIn,
    token
});
