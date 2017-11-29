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
    isFreeMode: false,
    registers: {
        library: [],
        framework: [],
        platform: [],
        tool: [],
        language: []
    }
};

describe('Reducer fullquizzes test', () => {
    it('GET_QUIZZES_BY_TYPE_REQUEST test' ,() => {
        expect(
            reducer(initialState, {
                type: types.GET_QUIZZES_BY_TYPE.REQUEST
            })
        ).toEqual({ 
            ...initialState, 
            loading: true
        });
    });
    it('GET_QUIZZES_BY_TYPE_SUCCESS test' ,() => {
        expect(
            reducer(initialState, {
                type: types.GET_QUIZZES_BY_TYPE.SUCCESS,
                data: {
                    type: 'library',
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
    it('GET_QUIZZES_BY_TYPE_FAILURE test' ,() => {
        expect(
            reducer(
                initialState, 
                {
                    type: types.GET_QUIZZES_BY_TYPE.FAILURE,
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
