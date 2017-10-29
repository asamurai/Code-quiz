import * as userTypes from './../../constants/user';

import reducer from './../user';

const types = {
    ...userTypes
};

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
    formState: {
        edit: false,
        view: true
    },
    modals: {
        imageUpload: false,
        userDelete: false
    },
    loggedIn: false
};

describe('Reducer user test', () => {
    it('Undefined action test', () => {
        expect(reducer(initialState, 'UNDEFINED_ACTION')).toBe(initialState);
    });
    it('USER_SIGNIN action test', () => {
        expect(
            reducer(initialState, {type: types.USER_SIGNIN.REQUEST})
        ).toEqual({...initialState, loading: true});
        expect(
            reducer(initialState, {type: types.USER_SIGNIN.SUCCESS, ...data})
        ).toEqual({...initialState, ...data, loggedIn: true});
        expect(
            reducer(initialState, {type: types.USER_SIGNIN.ERROR, ...error})
        ).toEqual({...initialState, ...error});
    });
    it('USER_SIGNOUT action test', () => {
        expect(
            reducer(initialState, {type: types.USER_SIGNOUT.REQUEST})
        ).toEqual({...initialState, loading: true});

        expect(
            reducer(initialState, {type: types.USER_SIGNOUT.SUCCESS})
        ).toEqual({...initialState});

        expect(
            reducer(initialState, {type: types.USER_SIGNOUT.ERROR, ...error})
        ).toEqual({...initialState, ...error});       
    });
    it('USER_REGISTER action test', () => {
        expect(
            reducer(initialState, {type: types.USER_REGISTER.REQUEST})
        ).toEqual({...initialState, loading: true});

        expect(
            reducer(initialState, {type: types.USER_REGISTER.SUCCESS})
        ).toEqual({...initialState});
        
        expect(
            reducer(initialState, {type: types.USER_REGISTER.ERROR, ...error})
        ).toEqual({...initialState, ...error});               
    });
    it('CHANGE_USER_PROFILE_FORM_EDIT_STATE action test', () => {
        expect(
            reducer(initialState, {type: types.CHANGE_USER_PROFILE_FORM_EDIT_STATE, state: false })
        ).toEqual({
            ...initialState,
            formState: { 
                view: true,
                edit: false
            }
        });
        expect(
            reducer(initialState, {type: types.CHANGE_USER_PROFILE_FORM_EDIT_STATE, state: true })
        ).toEqual({
            ...initialState,
            formState: {
                view: false,
                edit: true
            }
        });
    });
    it('CHANGE_USER_PROFILE_FORM_VIEW_STATE action test', () => {
        expect(
            reducer(initialState, {type: types.CHANGE_USER_PROFILE_FORM_VIEW_STATE, state: false })
        ).toEqual({
            ...initialState,
            formState: { 
                view: false,
                edit: true
            }
        });
        expect(
            reducer(initialState, {type: types.CHANGE_USER_PROFILE_FORM_VIEW_STATE, state: true })
        ).toEqual({
            ...initialState,
            formState: {
                view: true,
                edit: false
            }
        }); 
    });
    it('CHANGE_USER_PROFILE_FORM_MODAL_STATE action test', () => {
        expect(
            reducer(initialState, {type: types.CHANGE_USER_PROFILE_FORM_MODAL_STATE, modalState: { imageUpload: true } })
        ).toEqual({
            ...initialState,
            modals: {
                imageUpload: true,
                userDelete: false
            }
        });
        expect(
            reducer(initialState, {type: types.CHANGE_USER_PROFILE_FORM_MODAL_STATE, modalState: { userDelete: true } })
        ).toEqual({
            ...initialState,
            modals: {
                imageUpload: false,
                userDelete: true
            }
        }); 
    });
});
