import * as classifiersTypes from './../../constants/container_constants/classifiers';
import {
    withAuth 
} from './../../api';

const types = {
    ...classifiersTypes
};

export const getQuizCategories = () => async dispatch => {
    try {
        await dispatch({
            type: types.GET_QUIZ_CATEGORIES.REQUEST
        }); 
        const { data } = await withAuth('get',`/categories/`);
        await dispatch({
            type: types.GET_QUIZ_CATEGORIES.SUCCESS,
            data
        });                 
    } catch (error) {
        await dispatch({
            type: types.GET_QUIZ_CATEGORIES.FAILURE,
            error: error.message
        });     
    }
};

export const getQuizTopics = () => async dispatch => {
    try {
        await dispatch({
            type: types.GET_QUIZ_TOPICS.REQUEST
        }); 
        const { data } = await withAuth('get',`/topics/`);
        await dispatch({
            type: types.GET_QUIZ_TOPICS.SUCCESS,
            data
        });                 
    } catch (error) {
        await dispatch({
            type: types.GET_QUIZ_TOPICS.FAILURE,
            error: error.message
        });     
    }
};

export const getQuizChains = (categoryId) => async dispatch => {
    try {
        await dispatch({
            type: types.GET_QUIZ_CHAINS.REQUEST
        }); 
        const { data } = await withAuth('get',`/chain/${categoryId}`);
        await dispatch({
            type: types.GET_QUIZ_CHAINS.SUCCESS,
            data
        });                 
    } catch (error) {
        await dispatch({
            type: types.GET_QUIZ_CHAINS.FAILURE,
            error: error.message
        });     
    }
};

