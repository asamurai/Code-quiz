import * as fullquizzesTypes from './../../constants/container_constants/fullquizzes';

import reducer from './../fullquizes';

const types = {
    ...fullquizzesTypes
};

const dummyRegister = [
    1,
    2,
    3
];

const dummyError = 'error';

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
    topic: null,
    quizzes: []
};

describe('Reducer fullquizzes test', () => {
    it('GET_TOPICS_BY_CATEGORY_REQUEST test' ,() => {
        expect(
            reducer(initialState, {
                type: types.GET_TOPICS_BY_CATEGORY.REQUEST
            })
        ).toEqual({ 
            ...initialState, 
            loading: true
        });
    });
    it('GET_TOPICS_BY_CATEGORY_SUCCESS test' ,() => {
        expect(
            reducer(initialState, {
                type: types.GET_TOPICS_BY_CATEGORY.SUCCESS,
                data: {
                    category: 'library',
                    content: dummyRegister
                }
            })
        ).toEqual({ 
            ...initialState, 
            loading: false,
            error: null,
            registers: {
                ...initialState.registers,
                library: dummyRegister
            } 
        });
    });
    it('GET_TOPICS_BY_CATEGORY_FAILURE test' ,() => {
        expect(
            reducer(
                initialState, 
                {
                    type: types.GET_TOPICS_BY_CATEGORY.FAILURE,
                    error: dummyError
                }
            )
        ).toEqual(
            {
                ...initialState,
                error: dummyError
            }
        );
    });
});
