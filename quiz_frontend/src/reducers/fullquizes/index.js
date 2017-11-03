import * as fullquizzesTypes from './../../constants/fullquizzes';

const types = {
    ...fullquizzesTypes
};

const initialState = {
    loading: false,
    error: null,
    registers: {
        library: [],
        framework: [],
        platfowm: [],
        tool: [],
        language: []
    }
};

export default function (state = initialState, action){
    switch (action.type) {
        case types.GET_QUIZZES_BY_TYPE_REQUEST: 
            return {
                error: null,
                loading: true
            };
        case types.GET_QUIZZES_BY_TYPE_SUCCESS: 
            return {
                error: null,
                loading: false,
                registers: {
                    ...state.registers,
                    [action.data.type]: action.data.content
                }
            };
        case types.GET_QUIZZES_BY_TYPE_FAILURE: 
            return {
                error: action.error,
                loading: false
            };
        default:
            return state;
    }
}


