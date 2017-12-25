import {
    combineReducers
} from 'redux';

import * as classifiersTypes from './../../constants/container_constants/classifiers';

const types = {
    ...classifiersTypes
};

// const mockCategoriesList = [
//     {
//         category_id: 1,
//         name: 'javascript core',
//         description: 'javascript core'
//     },
//     {
//         category_id: 2,
//         name: 'ajax library',
//         description: 'ajax library'
//     },
//     {
//         category_id: 3,
//         name: 'React',
//         description: 'React'
//     },
//     {
//         category_id: 4,
//         name: 'Redux',
//         description: 'Redux'
//     }
// ];

// const mockQuestionChains = [
//     {
//         chain_id: 1,
//         name: 'variables',
//         description: 'variables'
//     },
//     {
//         chain_id: 2,
//         name: 'functions',
//         description: 'functions'
//     },
//     {
//         chain_id: 3,
//         name: 'loops',
//         description: 'loops'
//     },
//     {
//         chain_id: 4,
//         name: 'scopes',
//         description: 'scopes'
//     }
// ];

const initialState = {
    categoriesList: [],
    questionChains: [],
    questionTopics: [],
    loading: false,
    error: null
};

const loading = (state = initialState.loading, action) => {
    switch (action.type) {
        case types.GET_QUIZ_CATEGORIES.REQUEST:
        case types.GET_QUIZ_TOPICS.REQUEST:
        case types.GET_QUIZ_CHAINS.REQUEST:
            return true;
        case types.GET_QUIZ_CATEGORIES.SUCCESS:
        case types.GET_QUIZ_TOPICS.SUCCESS:
        case types.GET_QUIZ_CHAINS.SUCCESS:
        case types.GET_QUIZ_CATEGORIES.FAILURE:
        case types.GET_QUIZ_TOPICS.FAILURE:
        case types.GET_QUIZ_CHAINS.FAILURE:
            return false;
        default:
            return state;
    }
};

const error = (state = initialState.error, action) => {
    switch (action.type) {
        case types.GET_QUIZ_CATEGORIES.FAILURE:
        case types.GET_QUIZ_TOPICS.FAILURE:
        case types.GET_QUIZ_CHAINS.FAILURE:
            return action.error;
        case types.GET_QUIZ_CATEGORIES.REQUEST:
        case types.GET_QUIZ_TOPICS.REQUEST:
        case types.GET_QUIZ_CHAINS.REQUEST:
        case types.GET_QUIZ_CATEGORIES.SUCCESS:
        case types.GET_QUIZ_TOPICS.SUCCESS:
        case types.GET_QUIZ_CHAINS.SUCCESS:
            return null;
        default:
            return state;
    }
};

const categoriesList = (state = initialState.categoriesList, action) => {
    switch (action.type) {
        case types.GET_QUIZ_CATEGORIES.SUCCESS:
            return action.data;
        case types.GET_QUIZ_CATEGORIES.FAILURE:
            return [];
        default:
            return state;
    }
};

const questionChains = (state = initialState.questionChains, action) => {
    switch (action.type) {
        case types.GET_QUIZ_CHAINS.SUCCESS:
            return action.data;
        case types.GET_QUIZ_CHAINS.FAILURE:
            return [];
        default:
            return state;
    }
};

const questionTopics = (state = initialState.questionTopics, action) => {
    switch (action.type) {
        case types.GET_QUIZ_TOPICS.SUCCESS:
            return action.data;
        case types.GET_QUIZ_TOPICS.FAILURE:
            return [];
        default:
            return state;
    }
};

export default combineReducers({
    loading,
    error,
    categoriesList,
    questionChains,
    questionTopics
});
