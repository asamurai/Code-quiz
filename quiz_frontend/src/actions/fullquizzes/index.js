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
            type: types.GET_QUIZZES_BY_TYPE.FAILURE,
            error: error.message
        });         
    }
};
