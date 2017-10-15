import {
    NOTIFICATION_CLOSE_MESSAGE,
    NOTIFICATION_SHOW_ERROR_MESSAGE,
    NOTIFICATION_SHOW_SUCCESS_MESSAGE,
    NOTIFICATION_SHOW_INFO_MESSAGE
} from './../../constants/notifications';

import reducer from './../notifications';

const dummyData = {
    message: 'Message'
};

const initialState = {
    isSuccessMessage: false,
    isErrorMessage: false,
    isInfoMessage: false,
    message: ''
};

describe('Reducer notifications test', () => {
    it('Undefined action test', () => {
        expect(reducer(initialState, 'UNDEFINED_ACTION')).toBe(initialState);
    });
    it('NOTIFICATION_CLOSE_MESSAGE action test', () => {
        expect(reducer(initialState, {type: NOTIFICATION_CLOSE_MESSAGE, message: dummyData.message}))
        .toEqual(initialState);
    });
    it('NOTIFICATION_SHOW_INFO_MESSAGE action test', () => {
        expect(reducer(initialState, {type: NOTIFICATION_SHOW_INFO_MESSAGE, message: dummyData.message}))
        .toEqual({
            ...initialState, 
            isInfoMessage: true, 
            message: dummyData.message
        });
    });
    it('NOTIFICATION_SHOW_ERROR_MESSAGE action test', () => {
        expect(reducer(initialState, {type: NOTIFICATION_SHOW_ERROR_MESSAGE, message: dummyData.message}))
        .toEqual({
            ...initialState, 
            isErrorMessage: true, 
            message: dummyData.message
        });
    });
    it('NOTIFICATION_SHOW_SUCCESS_MESSAGE action test', () => {
        expect(reducer(initialState, {type: NOTIFICATION_SHOW_SUCCESS_MESSAGE, message: dummyData.message}))
        .toEqual({
            ...initialState, 
            isSuccessMessage: true, 
            message: dummyData.message
        });
    });
});
