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

const initialState = {
    categoriesList: mockCategoriesList,
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

export default combineReducers({
    loading,
    error,
    categoriesList
});
