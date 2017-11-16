import * as fullquizzesTypes from './../../constants/container_constants/fullquizzes';

const types = {
    ...fullquizzesTypes
};

const mockLibraryRegister = [
    {
        id: 1,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS45PBU2qyXzci5sfj0Dm4C_4V87mnpvVCqbjyZOHFQ_aROJwYl',
        title: 'React',
        content: 'React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.'
    },
    {
        id: 2,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS45PBU2qyXzci5sfj0Dm4C_4V87mnpvVCqbjyZOHFQ_aROJwYl',
        title: 'React',
        content: 'React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.'
    },
    {
        id: 3,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS45PBU2qyXzci5sfj0Dm4C_4V87mnpvVCqbjyZOHFQ_aROJwYl',
        title: 'React',
        content: 'React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.'
    },
    {
        id: 4,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS45PBU2qyXzci5sfj0Dm4C_4V87mnpvVCqbjyZOHFQ_aROJwYl',
        title: 'React',
        content: 'React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.'
    },
    {
        id: 5,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS45PBU2qyXzci5sfj0Dm4C_4V87mnpvVCqbjyZOHFQ_aROJwYl',
        title: 'React',
        content: 'React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.'
    },
    {
        id: 6,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS45PBU2qyXzci5sfj0Dm4C_4V87mnpvVCqbjyZOHFQ_aROJwYl',
        title: 'React',
        content: 'React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.'
    },
    {
        id: 7,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS45PBU2qyXzci5sfj0Dm4C_4V87mnpvVCqbjyZOHFQ_aROJwYl',
        title: 'React',
        content: 'React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.'
    }
];

const initialState = {
    loading: false,
    error: null,
    registers: {
        // library: [],
        // framework: [],
        // platform: [],
        // tool: [],
        // language: []
        // delete after backend finish
        library: mockLibraryRegister,
        framework: mockLibraryRegister,
        platform: mockLibraryRegister,
        tool: mockLibraryRegister,
        language: mockLibraryRegister
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.GET_QUIZZES_BY_TYPE.REQUEST: 
            return {
                ...state,
                error: null,
                loading: true
            };
        case types.GET_QUIZZES_BY_TYPE.SUCCESS: 
            return {
                ...state,
                error: null,
                loading: false,
                registers: {
                    ...state.registers,
                    [action.data.type]: action.data.content
                }
            };
        case types.GET_QUIZZES_BY_TYPE.FAILURE: 
            return {
                ...state,
                error: action.error,
                loading: false
            };
        default:
            return state;
    }
};



