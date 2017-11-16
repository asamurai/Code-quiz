import * as quizzesTypes from './../../constants/container_constants/quizzes';
import { 
    withAuth 
} from './../../api';

const types = {
    ...quizzesTypes
};

export const createQuizSession = quizId => async dispatch => {
    try {
        await dispatch({
            type: types.CREATE_QUIZ_SESSION.REQUEST
        });
        const { data } = await withAuth('post',`/quizzes/session/`, { quizId });
        await dispatch({
            type: types.CREATE_QUIZ_SESSION.SUCCESS,
            data
        });
    } catch (error) {
        await dispatch({
            type: types.CREATE_QUIZ_SESSION.FAILURE,
            error: error.message
        });         
    }
};

export const deleteQuizSession = quizId => async dispatch => {
    try {
        await dispatch({
            type: types.DELETE_QUIZ_SESSION.REQUEST
        });
        await withAuth('delete',`/quizzes/session/id/${quizId}`);
        await dispatch({
            type: types.DELETE_QUIZ_SESSION.SUCCESS
        });
    } catch (error) {
        await dispatch({
            type: types.DELETE_QUIZ_SESSION.FAILURE,
            error: error.message
        });         
    }
};

export const getQuizLevel = (quizData, quizSessionId) => async dispatch => {
    try {
        await dispatch({
            type: types.GET_QUIZ_LEVEL.REQUEST
        });
        await withAuth('post',`/quizzes/${quizSessionId}/level`, quizData);
        const { data } = await withAuth('get',`/quizzes/${quizSessionId}/level/next`);
        await dispatch({
            type: types.GET_QUIZ_LEVEL.SUCCESS,
            data
        });
    } catch (error) {
        await dispatch({
            type: types.GET_QUIZ_LEVEL.FAILURE,
            error: error.message
        });         
    }
};

export const getQuizResults = quizSessionId => async dispatch => {
    try {
        await dispatch({
            type: types.GET_QUIZ_RESULTS.REQUEST
        });
        const { data } = await withAuth('get',`/quizzes/results/${quizSessionId}`);
        await dispatch({
            type: types.GET_QUIZ_RESULTS.SUCCESS,
            data
        });
    } catch (error) {
        await dispatch({
            type: types.GET_QUIZ_RESULTS.FAILURE,
            error: error.message
        });         
    }
};

export const getQuizListByUserId = (userId, requestBody, pages) => async dispatch => {
    try {
        await dispatch({
            type: types.GET_QUIZZES_BY_USER_ID.REQUEST
        });
        const {
            limit
        } = requestBody;
        const {
            currentPage
        } = pages;
        const { data } = await withAuth('get',`/quizzes/list/${userId}?page=${currentPage}&limit=${limit}`);
        await dispatch({
            type: types.GET_QUIZZES_BY_USER_ID.SUCCESS,
            data
        });
    } catch (error) {
        await dispatch({
            type: types.GET_QUIZZES_BY_USER_ID.FAILURE,
            error: error.message
        });         
    }
};

export const setQuizCreateFormState = state => dispatch => dispatch({
    type: types.CHANGE_QUIZZES_CREATE_FORM_STATE,
    state
});

export const resetQuizzesErrors = () => dispatch => dispatch({
    type: types.RESET_QUIZZES_ERRORS
});

export const resetQuizzesTraining = () => dispatch => dispatch({
    type: types.RESET_QUIZ_TRAINING
});

export const resetQuizzesList = () => dispatch => dispatch({
    type: types.RESET_QUIZ_LIST
});

export const resetQuizzesCreateForm = () => dispatch => dispatch({
    type: types.RESET_QUIZ_CREATE_FORM
});

export const setQuizzesRequestBody = requestBody => dispatch => dispatch({
    type: types.SET_QUIZZES_REQUEST_BODY,
    requestBody
});

export const setQuizzesPages = pages => dispatch => dispatch({
    type: types.SET_QUIZZES_PAGES,
    pages
});
