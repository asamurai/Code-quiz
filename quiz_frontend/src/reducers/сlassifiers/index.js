import {
    combineReducers
} from 'redux';

const mockThemesList = [
    {
        id: 1,
        name: 'javascript core',
        description: 'javascript core'
    },
    {
        id: 2,
        name: 'ajax library',
        description: 'ajax library'
    },
    {
        id: 3,
        name: 'React',
        description: 'React'
    },
    {
        id: 4,
        name: 'Redux',
        description: 'Redux'
    }
];

const initialState = {
    themesList: mockThemesList,
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

const themesList = (state = initialState.themesList, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default combineReducers({
    loading,
    error,
    themesList
});
