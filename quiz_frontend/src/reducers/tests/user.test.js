import {
    USER_SIGNIN,
    USER_SIGNOUT,
    USER_REGISTER
} from './../../constants';

import reducer from './../user.js';

const data = {
    data: {
        name: 'Artem'
    }
};
const error = {
    error: 'Fail'
};

const initialState = {
    loading: false,
    error: null,
    data: null,
    loggedIn: false
};

describe('Reducer user test', () => {
    it('Undefined action test', () => {
        expect(reducer(initialState, 'UNDEFINED_ACTION')).toBe(initialState);
    });
    it('USER_SIGNIN action test', () => {
        expect(reducer(initialState, {type: USER_SIGNIN.REQUEST})).toEqual({...initialState, loading: true});
        expect(reducer(initialState, {type: USER_SIGNIN.SUCCESS, ...data})).toEqual({...initialState, ...data, loggedIn: true});
        expect(reducer(initialState, {type: USER_SIGNIN.ERROR, ...error})).toEqual({...initialState, ...error});
    });
    it('USER_SIGNOUT action test', () => {
        expect(reducer(initialState, {type: USER_SIGNOUT.REQUEST})).toEqual({...initialState, loading: true});
        expect(reducer(initialState, {type: USER_SIGNOUT.SUCCESS})).toEqual({...initialState});
        expect(reducer(initialState, {type: USER_SIGNOUT.ERROR, ...error})).toEqual({...initialState, ...error});       
    });
    it('USER_REGISTER action test', () => {
        expect(reducer(initialState, {type: USER_REGISTER.REQUEST})).toEqual({...initialState, loading: true});
        expect(reducer(initialState, {type: USER_REGISTER.SUCCESS})).toEqual({...initialState});
        expect(reducer(initialState, {type: USER_REGISTER.ERROR, ...error})).toEqual({...initialState, ...error});               
    });
});
