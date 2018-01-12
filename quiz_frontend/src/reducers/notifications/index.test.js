import * as notificationsTypes from './../../constants/container_constants/notifications';

import reducer from './../notifications';

const types = {
    ...notificationsTypes
};

const dummyData = {
    message: 'Message'
};

const initialState = {
    isSuccessMessage: false,
    isErrorMessage: false,
    isInfoMessage: false,
    message: '',
    title: ''
};

describe('Reducer notifications test', () => {
    it('Undefined action test', () => {
        expect(reducer(initialState, 'UNDEFINED_ACTION')).toBe(initialState);
    });
    it('NOTIFICATION_CLOSE_MESSAGE action test', () => {
        expect(reducer(initialState, {type: types.NOTIFICATION_CLOSE_MESSAGE, message: dummyData.message}))
        .toEqual(initialState);
    });
    it('NOTIFICATION_SHOW_INFO_MESSAGE action test', () => {
        expect(reducer(initialState, {type: types.NOTIFICATION_SHOW_INFO_MESSAGE, message: dummyData.message}))
        .toEqual({
            ...initialState, 
            isInfoMessage: true, 
            message: dummyData.message,
            title: 'Attention!'
        });
    });
    it('NOTIFICATION_SHOW_ERROR_MESSAGE action test', () => {
        expect(reducer(initialState, {type: types.NOTIFICATION_SHOW_ERROR_MESSAGE, message: dummyData.message}))
        .toEqual({
            ...initialState, 
            isErrorMessage: true, 
            message: dummyData.message,
            title: 'Error!'
        });
    });
    it('NOTIFICATION_SHOW_SUCCESS_MESSAGE action test', () => {
        expect(reducer(initialState, {type: types.NOTIFICATION_SHOW_SUCCESS_MESSAGE, message: dummyData.message}))
        .toEqual({
            ...initialState, 
            isSuccessMessage: true, 
            message: dummyData.message,
            title: 'Success!'
        });
    });
});
