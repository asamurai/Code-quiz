import * as fullquizzesTypes from './../../constants/container_constants/fullquizzes';
import * as notifyTypes from './../../constants/container_constants/notifications';
import { 
    withAuth 
} from './../../api';

const types = {
    ...fullquizzesTypes,
    ...notifyTypes
};

export const getFullQuizzesByType = type => async dispatch => {
    try {
        await dispatch({
            type: types.GET_QUIZZES_BY_TYPE.REQUEST
        });
        const { data } = await withAuth('get',`/quizzes/type/${type}`);
        await dispatch({
            type: types.GET_QUIZZES_BY_TYPE.SUCCESS,
            data
        });
    } catch (error) {
        await dispatch({
            type: types.GET_QUIZZES_BY_TYPE.ERROR,
            error: error.message
        });  
        await dispatch({
            type: types.NOTIFICATION_SHOW_ERROR_MESSAGE,
            message: error.message
        });        
    }
};

export const setFullQuizzesActiveKey = key => dispatch => {
    dispatch({
        type: types.SET_FULL_QUIZZES_ACTIVE_KEY,
        key
    });
};
