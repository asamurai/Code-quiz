import * as quizzesTypes from './../../constants/container_constants/quizzes';

import reducer from './../quizzes';

const types = {
    ...quizzesTypes
};

const dummyError = {
    message: 'Message'
};

const dummyQuizListResponse = {
    content: [
        1,
        2,
        3
    ],
    limit: 100,
    currentPage: 1,
    totalFinded: 3
};

const dummyQuizCreateData = {
    name: 'Quiz name'
};

const dummyQuizTrainingData = {
    data: {
        quizId: 1
    },
    results: {
        result: 'You are great!'
    },
    is_finished: true
};

const initialState = {
    quizList: {
        pages: {
            currentPage: 1,
            totalFinded: 0
        },
        requestBody: {
            limit: 10
        },
        register: []
    },
    modalStatus: {
        deleteQuiz: false,
        createQuiz: false,
        editQuestion: false,
        deleteQuestion: false,
        createQuestion: false
    },
    formCreation: {
        selectedQuizId: null,
        data: null,
        state: {
            create: false,
            edit: false,
            view: false
        }
    },
    formTraining: {
        data: null,
        results: null,
        is_finished: false
    },
    loading: false,
    error: null
};

describe('Reducer quizzes test', () => {
    it('Undefined action test', () => {
        expect(reducer(initialState, {type: 'UNDEFINED_ACTION'})).toEqual(initialState);
    });
    it('GET_QUIZ_LEVEL action test', () => {
        expect(
            reducer(initialState, { type: types.GET_QUIZ_LEVEL.REQUEST })
        ).toEqual({ ...initialState, loading: true });
        expect(
            reducer(
                initialState,
                { 
                    type: types.GET_QUIZ_LEVEL.SUCCESS,
                    data: {
                        content: dummyQuizTrainingData.data,
                        is_finished: dummyQuizTrainingData.is_finished
                    }
                }
            )
        ).toEqual({
            ...initialState,
            formTraining: {
                ...initialState.formTraining,
                data: dummyQuizTrainingData.data,
                is_finished: dummyQuizTrainingData.is_finished
            }
        });
        expect(
            reducer(
                initialState,
                { 
                    type: types.GET_QUIZ_LEVEL.FAILURE,
                    error: dummyError.message
                }
            )
        ).toEqual({ ...initialState, error: dummyError.message });
    });
    it('GET_QUIZ_RESULTS action test', () => {
        expect(
            reducer(initialState, { type: types.GET_QUIZ_RESULTS.REQUEST })
        ).toEqual({ ...initialState, loading: true });
        expect(
            reducer(
                initialState,
                {
                    type: types.GET_QUIZ_RESULTS.SUCCESS,
                    data: dummyQuizTrainingData.results
                }
            )
        ).toEqual({
            ...initialState,
            formTraining: {
                ...initialState.formTraining,
                results: dummyQuizTrainingData.results,
                is_finished: true,
                data: null
            }
        });
        expect(
            reducer(
                initialState,
                { 
                    type: types.GET_QUIZ_RESULTS.FAILURE,
                    error: dummyError.message
                }
            )
        ).toEqual({ ...initialState, error: dummyError.message });
    });
    it('GET_QUIZZES_BY_USER_ID action test', () => {
        expect(
            reducer(initialState, { type: types.GET_QUIZZES_BY_USER_ID.REQUEST })
        ).toEqual({ ...initialState, loading: true });
        expect(
            reducer(
                initialState,
                {
                    type: types.GET_QUIZZES_BY_USER_ID.SUCCESS,
                    data: {
                        content: dummyQuizListResponse.content,
                        currentPage: dummyQuizListResponse.currentPage,
                        totalFinded: dummyQuizListResponse.totalFinded
                    }
                }
            )
        ).toEqual({
            ...initialState,
            quizList: {
                ...initialState.quizList,
                pages: {
                    ...initialState.quizList.pages,
                    currentPage: dummyQuizListResponse.currentPage,
                    totalFinded: dummyQuizListResponse.totalFinded
                },
                register: dummyQuizListResponse.content
            }
        });
        expect(
            reducer(
                initialState,
                { 
                    type: types.GET_QUIZZES_BY_USER_ID.FAILURE,
                    error: dummyError.message
                }
            )
        ).toEqual({ ...initialState, error: dummyError.message });
    });
    it('GET_QUIZ_BY_ID action test', () => {
        expect(
            reducer(initialState, { type: types.GET_QUIZ_BY_ID.REQUEST })
        ).toEqual({ ...initialState, loading: true });
        expect(
            reducer(
                initialState,
                {
                    type: types.GET_QUIZ_BY_ID.SUCCESS,
                    data: dummyQuizCreateData
                }
            )
        ).toEqual({
            ...initialState,
            formCreation: {
                ...initialState.formCreation,
                data: dummyQuizCreateData
            }
        });
        expect(
            reducer(
                initialState,
                { 
                    type: types.GET_QUIZ_BY_ID.FAILURE,
                    error: dummyError.message
                }
            )
        ).toEqual({ ...initialState, error: dummyError.message });
    });
    it('CHANGE_QUIZZES_CREATE_FORM_STATE action test', () => {
        expect(
            reducer(
                initialState,
                {
                    type: types.CHANGE_QUIZZES_CREATE_FORM_STATE,
                    state: {
                        edit: true
                    }
                }
            )
        ).toEqual({
            ...initialState,
            formCreation: {
                ...initialState.formCreation,
                state: {
                    ...initialState.formCreation.state,
                    edit: true
                }
            }
        });
        expect(
            reducer(
                initialState,
                {
                    type: types.CHANGE_QUIZZES_CREATE_FORM_STATE,
                    state: {
                        create: true
                    }
                }
            )
        ).toEqual({
            ...initialState,
            formCreation: {
                ...initialState.formCreation,
                state: {
                    ...initialState.formCreation.state,
                    create: true
                }
            }
        });
        expect(
            reducer(
                initialState,
                {
                    type: types.CHANGE_QUIZZES_CREATE_FORM_STATE,
                    state: {
                        view: true
                    }
                }
            )
        ).toEqual({
            ...initialState,
            formCreation: {
                ...initialState.formCreation,
                state: {
                    ...initialState.formCreation.state,
                    view: true
                }
            }
        });
    });
    it('RESET_QUIZZES_ERRORS action test', () => {
        expect(
            reducer(
                initialState,
                {
                    type: types.RESET_QUIZZES_ERRORS,
                }
            )
        ).toEqual({ ...initialState, error: null });
    });
    it('RESET_QUIZ_TRAINING action test', () => {
        expect(
            reducer(
                initialState,
                {
                    type: types.RESET_QUIZ_TRAINING,
                }
            )
        ).toEqual(initialState);
    });
    it('RESET_QUIZ_LIST action test', () => {
        expect(
            reducer(
                initialState,
                {
                    type: types.RESET_QUIZ_LIST,
                }
            )
        ).toEqual(initialState);
    });
    it('RESET_QUIZ_CREATE_FORM action test', () => {
        expect(
            reducer(
                initialState,
                {
                    type: types.RESET_QUIZ_CREATE_FORM,
                }
            )
        ).toEqual(initialState);
    });
    it('SET_QUIZZES_REQUEST_BODY action test', () => {
        expect(
            reducer(
                initialState,
                {
                    type: types.SET_QUIZZES_REQUEST_BODY,
                    requestBody: {
                        limit: dummyQuizListResponse.limit
                    }
                }
            )
        ).toEqual({
            ...initialState,
            quizList: {
                ...initialState.quizList,
                requestBody: {
                    ...initialState.quizList.requestBody,
                    limit: dummyQuizListResponse.limit
                }
            }
        });
    });
    it('SET_QUIZZES_PAGES action test', () => {
        expect(
            reducer(
                initialState,
                {
                    type: types.SET_QUIZZES_PAGES,
                    pages: {
                        currentPage: dummyQuizListResponse.currentPage,
                        totalFinded: dummyQuizListResponse.totalFinded
                    }
                }
            )
        ).toEqual({
            ...initialState,
            quizList: {
                ...initialState.quizList,
                pages: {
                    ...initialState.quizList.pages,
                    currentPage: dummyQuizListResponse.currentPage,
                    totalFinded: dummyQuizListResponse.totalFinded
                }
            }
        });
    });
});
