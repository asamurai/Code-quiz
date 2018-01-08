import * as fullquizzesTypes from './../../constants/container_constants/fullquizzes';
import { 
    withAuth 
} from './../../api';

const types = {
    ...fullquizzesTypes
};

export const getTopicsByCategoryId = ({categoryName, categoryId}) => async dispatch => {
    try {
        await dispatch({
            type: types.GET_TOPICS_BY_CATEGORY.REQUEST
        });
        const { data } = await withAuth('get',`/topic/by_category/${categoryId}`);
        await dispatch({
            type: types.GET_TOPICS_BY_CATEGORY.SUCCESS,
            data: {
                category: categoryName,
                content: data
            }
        });
    } catch (error) {
        await dispatch({
            type: types.GET_TOPICS_BY_CATEGORY.FAILURE,
            error: error.message
        });         
    }
};

export const getQuizzesByTopicId = topicId => async dispatch => {
    try {
        await dispatch({
            type: types.GET_QUIZZES_BY_TOPIC.REQUEST
        });
        const { data } = await withAuth('get',`/quizzes/by_topic/${topicId}`);
        await dispatch({
            type: types.GET_QUIZZES_BY_TOPIC.SUCCESS,
            data
        });
    } catch (error) {
        await dispatch({
            type: types.GET_QUIZZES_BY_TOPIC.FAILURE,
            error: error.message
        });         
    }
};

export const getTopicInfoByTopicId = topicId => async dispatch => {
    try {
        await dispatch({
            type: types.GET_TOPIC_INFO_BY_TOPIC_ID.REQUEST
        });
        const { data } = await withAuth('get',`/topic/${topicId}`);
        await dispatch({
            type: types.GET_TOPIC_INFO_BY_TOPIC_ID.SUCCESS,
            data
        });
    } catch (error) {
        await dispatch({
            type: types.GET_TOPIC_INFO_BY_TOPIC_ID.FAILURE,
            error: error.message
        });         
    }
};

export const clearFullTopicQuizzes = () => dispatch => dispatch({
    type: types.CLEAR_QUIZZES_BY_TOPIC
});

export const clearFullTopicInfo = () => dispatch => dispatch({
    type: types.CLEAR_TOPIC_INFO
});
