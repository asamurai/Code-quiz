import {
    combineReducers
} from 'redux';

import * as fullquizzesTypes from './../../constants/container_constants/fullquizzes';

const types = {
    ...fullquizzesTypes
};

const initialState = {
    loading: false,
    error: null,
    registers: {
        library: [],
        framework: [],
        platform: [],
        tool: [],
        language: []
    },
    quizzes: []
};

const registers = (state = initialState.registers, action) => {
    switch (action.type) {
        case types.GET_TOPICS_BY_CATEGORY.SUCCESS: 
            return {
                ...state,
                [action.data.category]: action.data.content
            };
        default:
            return state;
    }
};

const quizzes = (state = initialState.quizzes, action) => {
    switch (action.type) {
        case types.GET_QUIZZES_BY_TOPIC.SUCCESS: 
            return action.data;
        case types.CLEAR_QUIZZES_BY_TOPIC: 
            return [];
        default:
            return state;
    }
};

const loading = (state = initialState.loading, action) => {
    switch (action.type) {
        case types.GET_TOPICS_BY_CATEGORY.REQUEST:
            return true;
        case types.GET_TOPICS_BY_CATEGORY.SUCCESS:
        case types.GET_TOPICS_BY_CATEGORY.FAILURE:
            return false;
        default:
            return state;
    }
};

const error = (state = initialState.error, action) => {
    switch (action.type) {
        case types.GET_TOPICS_BY_CATEGORY.REQUEST:
        case types.GET_TOPICS_BY_CATEGORY.SUCCESS:
            return null;
        case types.GET_TOPICS_BY_CATEGORY.FAILURE:
            return action.error;
        default:
            return state;
    }
};

export default combineReducers({
    registers,
    quizzes,
    loading,
    error
});


