import * as quizzesTypes from './../../constants/container_constants/quizzes';
import { 
    withAuth,
    withAuthToken
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

export const createQuiz = createData => async dispatch => {
    try {
        await dispatch({
            type: types.CREATE_QUIZ.REQUEST
        });
        const { data } = await withAuthToken('post',`/quizzes/`, createData);
        await dispatch({
            type: types.CREATE_QUIZ.SUCCESS,
            data,
            message: 'Quiz created succesfully.'
        });
    } catch (error) {
        await dispatch({
            type: types.CREATE_QUIZ.FAILURE,
            error: 'Quiz creation failed.'
        });         
    }
};

export const updateQuiz = (quizId, dataToUpdate) => async dispatch => {
    try {
        await dispatch({
            type: types.UPDATE_QUIZ.REQUEST
        });
        const { data } = await withAuthToken('put',`/quizzes/${quizId}/`, dataToUpdate);
        await dispatch({
            type: types.UPDATE_QUIZ.SUCCESS,
            data,
            message: 'Quiz updated succesfully.'
        });
        await dispatch({
            type: types.CHANGE_QUIZZES_CREATE_FORM_STATE,
            state: {
                view: true
            }
        });
    } catch (error) {
        await dispatch({
            type: types.UPDATE_QUIZ.FAILURE,
            error: 'Quiz creation failed.'
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

export const getQuizListByUserId = userId => async dispatch => {
    try {
        await dispatch({
            type: types.GET_QUIZZES_BY_USER_ID.REQUEST
        });
        const { data } = await withAuth('get',`/quizzes/by_user/${userId}`);
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

export const getQuizByQuizId = quizId => async dispatch => {
    try {
        await dispatch({
            type: types.GET_QUIZ_BY_ID.REQUEST
        });
        const { data } = await withAuth('get',`/quizzes/${quizId}`);
        await dispatch({
            type: types.GET_QUIZ_BY_ID.SUCCESS,
            data
        });
    } catch (error) {
        await dispatch({
            type: types.GET_QUIZ_BY_ID.FAILURE,
            error: error.message
        });         
    }
};

export const deleteQuizByQuizId = quizId => async dispatch => {
    try {
        await dispatch({
            type: types.DELETE_QUIZ_BY_QUIZ_ID.REQUEST
        });
        await withAuth('delete',`/quizzes/${quizId}/`);
        await dispatch({
            type: types.DELETE_QUIZ_BY_QUIZ_ID.SUCCESS,
            quizId,
            message: 'Quiz deleted succesfully.'
        });
    } catch (error) {
        await dispatch({
            type: types.DELETE_QUIZ_BY_QUIZ_ID.FAILURE,
            error: 'Quiz delete failed.'
        });         
    }
};

export const createQuestion = questionData => async dispatch => {
    try {
        await dispatch({
            type: types.CREATE_QUESTION.REQUEST
        });
        const { data } = await withAuth('post',`/questions/`, questionData);
        await dispatch({
            type: types.CREATE_QUESTION.SUCCESS,
            data,
            message: 'Question created succesfully.'
        });
        await dispatch({
            type: types.CHANGE_QUESTION_CREATE_FORM_STATE,
            state: {}
        });
        await dispatch({
            type: types.RESET_QUESTION_CREATE_FORM
        });
    } catch (error) {
        await dispatch({
            type: types.CREATE_QUESTION.FAILURE,
            error: 'Question create failed.'
        });         
    }
};

export const editQuestion = (questionId, questionData) => async dispatch => {
    try {
        await dispatch({
            type: types.UPDATE_QUESTION.REQUEST
        });
        const { data } = await withAuth('put',`/questions/${questionId}/`, questionData);
        await dispatch({
            type: types.UPDATE_QUESTION.SUCCESS,
            data,
            message: 'Question updated succesfully.'
        });
        await dispatch({
            type: types.CHANGE_QUESTION_CREATE_FORM_STATE,
            state: {}
        });
        await dispatch({
            type: types.RESET_QUESTION_CREATE_FORM
        });
    } catch (error) {
        await dispatch({
            type: types.UPDATE_QUESTION.FAILURE,
            error: 'Question update failed.'
        });         
    }
};

export const deleteQuestion = questionId => async dispatch => {
    try {
        await dispatch({
            type: types.DELETE_QUESTION.REQUEST
        });
        await withAuth('delete',`/questions/${questionId}/`);
        await dispatch({
            type: types.DELETE_QUESTION.SUCCESS,
            questionId,
            message: 'Question deleted succesfully.'
        });
        await dispatch({
            type: types.CHANGE_QUESTION_CREATE_FORM_STATE,
            state: {}
        });
        await dispatch({
            type: types.RESET_QUESTION_CREATE_FORM
        });
    } catch (error) {
        await dispatch({
            type: types.DELETE_QUESTION.FAILURE,
            error: 'Question deleted failed.'
        });         
    }
};

export const setQuestionData = questionData => dispatch => dispatch({
    type: types.SET_QUESTION_DATA,
    data: questionData
});

export const setQuizCreateFormState = state => dispatch => dispatch({
    type: types.CHANGE_QUIZZES_CREATE_FORM_STATE,
    state
});

export const setQuestionCreateFormState = state => dispatch => dispatch({
    type: types.CHANGE_QUESTION_CREATE_FORM_STATE,
    state
});

export const setQuizMaxLevels = maxLevel => dispatch => dispatch({
    type: types.SET_QUIZ_MAX_LEVELS,
    maxLevel
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

export const resetQuestionCreateForm = () => dispatch => dispatch({
    type: types.RESET_QUESTION_CREATE_FORM
});

export const setQuizzesRequestBody = requestBody => dispatch => dispatch({
    type: types.SET_QUIZZES_REQUEST_BODY,
    requestBody
});

export const setQuizzesPages = pages => dispatch => dispatch({
    type: types.SET_QUIZZES_PAGES,
    pages
});
