import {
    combineReducers
} from 'redux';

import * as userTypes from './../../constants/container_constants/user';

const types = {
    ...userTypes
};

const mockUserStatisticsData = [
    {
        id: 1,
        testId: 1,
        test: {
            name: 'Python basics',
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHMdsvCwKqIJxU1U-pt6YLZ-iMapbCoWvamcnarpreAa_3xpcd'
        },
        testResult: {
            score: 0.85,
            correct: 85,
            incorrect: 15,
            total: 100
        },
        date: 'Mon Oct 30 2017 00:31:59 GMT+0200 (EET)'
    },
    {
        id: 2,
        testId: 1,
        test: {
            name: 'Python basics',
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHMdsvCwKqIJxU1U-pt6YLZ-iMapbCoWvamcnarpreAa_3xpcd'
        },
        testResult: {
            score: 0.7,
            correct: 70,
            incorrect: 30,
            total: 100
        },
        date: 'Mon Oct 30 2017 00:31:59 GMT+0200 (EET)'
    },
    {
        id: 3,
        testId: 1,
        test: {
            name: 'Python basics',
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHMdsvCwKqIJxU1U-pt6YLZ-iMapbCoWvamcnarpreAa_3xpcd'
        },
        testResult: {
            score: 0.65,
            correct: 65,
            incorrect: 35,
            total: 100
        },
        date: 'Mon Oct 30 2017 00:31:59 GMT+0200 (EET)'
    },
    {
        id: 4,
        testId: 1,
        test: {
            name: 'Javascript basics',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png'
        },
        testResult: {
            score: 0.75,
            correct: 75,
            incorrect: 25,
            total: 100
        },
        date: 'Mon Oct 30 2017 00:31:59 GMT+0200 (EET)'
    },
    {
        id: 5,
        testId: 1,
        test: {
            name: 'Java basics',
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2yRwrZFKJNJ3NV4modFoVbbVOJfTxfmOPbmEN2oi8xcXy3XmjFg'
        },
        testResult: {
            score: 0.35,
            correct: 35,
            incorrect: 65,
            total: 100
        },
        date: 'Mon Oct 30 2017 00:31:59 GMT+0200 (EET)'
    },
    {
        id: 6,
        testId: 1,
        test: {
            name: 'Javascript basics',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png'
        },
        testResult: {
            score: 0.45,
            correct: 45,
            incorrect: 55,
            total: 100
        },
        date: 'Mon Oct 30 2017 00:31:59 GMT+0200 (EET)'
    }
];

const initialState = {
    loading: false,
    error: null,
    role: null,
    data: { id: 1, name: 'Artem' },
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
            register: mockUserStatisticsData,
            // register: [],
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
    loggedIn: true
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
        case types.USER_SIGNIN.SUCCESS:
            return action.role;
        default:
            return state;
    }
};

const data = (state = initialState.data, action) => {
    switch (action.type) {
        case types.USER_SIGNIN.SUCCESS:
        case types.USER_UPDATE.SUCCESS:
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
    loggedIn
});
