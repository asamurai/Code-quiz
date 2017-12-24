import {
    combineReducers
} from 'redux';

const mockCategoriesList = [
    {
        category_id: 1,
        name: 'javascript core',
        description: 'javascript core'
    },
    {
        category_id: 2,
        name: 'ajax library',
        description: 'ajax library'
    },
    {
        category_id: 3,
        name: 'React',
        description: 'React'
    },
    {
        category_id: 4,
        name: 'Redux',
        description: 'Redux'
    }
];

const mockQuestionChains = [
    {
        chain_id: 1,
        name: 'variables',
        description: 'variables'
    },
    {
        chain_id: 2,
        name: 'functions',
        description: 'functions'
    },
    {
        chain_id: 3,
        name: 'loops',
        description: 'loops'
    },
    {
        chain_id: 4,
        name: 'scopes',
        description: 'scopes'
    }
];

const initialState = {
    categoriesList: mockCategoriesList,
    questionChains: mockQuestionChains,
    loading: false,
    error: null
};

const loading = (state = initialState.loading, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

const error = (state = initialState.error, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

const categoriesList = (state = initialState.categoriesList, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

const questionChains = (state = initialState.questionChains, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default combineReducers({
    loading,
    error,
    categoriesList,
    questionChains
});
