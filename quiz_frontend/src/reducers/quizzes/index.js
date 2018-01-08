import {
    combineReducers
} from 'redux';

import * as quizzesTypes from './../../constants/container_constants/quizzes';

const types = {
    ...quizzesTypes
};

const initialState = {
    quizList: {
        pages: {
            currentPage: 1,
            totalFinded: 0
        },
        requestBody: {
            limit: 10
        },
        register: []
    },
    modalStatus: {
        deleteQuiz: false,
        createQuiz: false,
        deleteQuestion: false
    },
    formQuizCreation: {
        data: null,
        maxLevel: 1,
        state: {
            create: false,
            edit: false,
            view: false
        }
    },
    formQuestionCreation: {
        data: null,
        state: {
            create: false,
            edit: false,
            view: false
        }
    },
    formTraining: {
        quizSessionId: null,
        data: null,
        results: null,
        isFinished: false
    },
    loading: false,
    error: null
};

const quizList = (state = initialState.quizList, action) => {
    switch (action.type) {
        case types.RESET_QUIZ_LIST:
            return initialState.quizList;
        case types.SET_QUIZZES_REQUEST_BODY:
            return {
                ...state,
                requestBody: {
                    ...state.requestBody,
                    ...action.requestBody
                }
            };
        case types.SET_QUIZZES_PAGES:
            return {
                ...state,
                pages: {
                    ...state.pages,
                    ...action.pages
                }
            };
        case types.GET_QUIZZES_BY_USER_ID.SUCCESS:
            return {
                ...state,
                register: action.data,
                pages: {
                    ...state.pages,
                    currentPage: 1,
                    totalFinded: action.data.length
                }
            };
        case types.DELETE_QUIZ_BY_QUIZ_ID.SUCCESS:
            return {
                ...state,
                register: state.register.filter(quiz => quiz.id !== action.quizId),
                pages: {
                    ...state.pages,
                    totalFinded: state.pages.totalFinded.length - 1
                }
            };
        default:
            return state;
    }
};

const formQuizCreation = (state = initialState.formQuizCreation, action) => {
    switch (action.type) {
        case types.RESET_QUIZ_CREATE_FORM:
            return initialState.formQuizCreation;
        case types.CHANGE_QUIZZES_CREATE_FORM_STATE:
            return {
                ...state,
                state: {
                    ...initialState.formQuizCreation.state,
                    ...action.state,
                }
            };
        case types.GET_QUIZ_BY_ID.SUCCESS:
            return {
                ...state,
                data: action.data
            };
        case types.SET_QUIZ_MAX_LEVELS:
            return {
                ...state,
                maxLevel: action.maxLevel
            };
        case types.GET_QUIZ_BY_ID.FAILURE:
        default:
            return state;
    }
};

const formQuestionCreation = (state = initialState.formQuestionCreation, action) => {
    switch (action.type) {
        case types.RESET_QUESTION_CREATE_FORM:
            return initialState.formQuestionCreation;
        case types.CHANGE_QUESTION_CREATE_FORM_STATE:
            return {
                ...state,
                state: {
                    ...initialState.formQuestionCreation.state,
                    ...action.state,
                }
            };
        case types.SET_QUESTION_DATA:
            return {
                ...state,
                data: action.data
            };
        default:
            return state;
    }
};

const formTraining = (state = initialState.formTraining, action) => {
    switch (action.type) {
        case types.RESET_QUIZ_TRAINING:
        case types.DELETE_QUIZ_SESSION.SUCCESS:
            return initialState.formTraining;
        case types.CREATE_QUIZ_SESSION.SUCCESS:
            return {
                ...state,
                quizSessionId: action.data.quizSessionId
            };
        case types.GET_QUIZ_LEVEL.SUCCESS:
            return {
                ...state,
                data: action.data.content,
                isFinished: action.data.isFinished
            };
        case types.GET_QUIZ_RESULTS.SUCCESS:
            return {
                ...state,
                data: null,
                isFinished: true,
                results: action.data
            };
        case types.CREATE_QUIZ_SESSION.FAILURE:
        case types.GET_QUIZ_LEVEL.FAILURE:
        case types.GET_QUIZ_RESULTS.FAILURE:
        case types.DELETE_QUIZ_SESSION.FAILURE:
        default:
            return state;
    }
};

const modalStatus = (state = initialState.modalStatus, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

const error = (state = initialState.error, action) => {
    switch (action.type) {
        case types.RESET_QUIZZES_ERRORS:
            return null;
        case types.GET_QUIZ_BY_ID.FAILURE:
        case types.GET_QUIZZES_BY_USER_ID.FAILURE:
        case types.GET_QUIZ_RESULTS.FAILURE:
        case types.CREATE_QUIZ_SESSION.FAILURE:
        case types.GET_QUIZ_LEVEL.FAILURE:
        case types.DELETE_QUIZ_SESSION.FAILURE:
            return action.error;
        default:
            return state;
    }
};

const loading = (state = initialState.loading, action) => {
    switch (action.type) {
        case types.GET_QUIZ_BY_ID.REQUEST:
        case types.CREATE_QUIZ_SESSION.REQUEST:
        case types.GET_QUIZ_LEVEL.REQUEST:
        case types.GET_QUIZ_RESULTS.REQUEST:
        case types.DELETE_QUIZ_SESSION.REQUEST:
        case types.GET_QUIZZES_BY_USER_ID.REQUEST:
            return true;
        case types.GET_QUIZZES_BY_USER_ID.SUCCESS:
        case types.DELETE_QUIZ_SESSION.SUCCESS:
        case types.GET_QUIZ_RESULTS.SUCCESS:
        case types.CREATE_QUIZ_SESSION.SUCCESS:
        case types.GET_QUIZ_LEVEL.SUCCESS:
        case types.GET_QUIZ_BY_ID.SUCCESS:
        case types.GET_QUIZ_RESULTS.FAILURE:
        case types.CREATE_QUIZ_SESSION.FAILURE:
        case types.GET_QUIZ_LEVEL.FAILURE:
        case types.DELETE_QUIZ_SESSION.FAILURE:
        case types.GET_QUIZ_BY_ID.FAILURE:
            return false;
        default:
            return state;
    }
};

export default combineReducers({
    quizList,
    formQuizCreation,
    formQuestionCreation,
    formTraining,
    loading,
    error,
    modalStatus
});
