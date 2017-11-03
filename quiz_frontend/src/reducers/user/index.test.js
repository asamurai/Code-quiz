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
    forms: {
        profile: {
            state: {
                edit: false,
                view: true
            },
            modals: {
                imageUpload: false
            }
        },
        settings: {
        },
        statistics: {
            register: [],
            requestBody: {
                limit: 10
            },
            pages: {
                currentPage: 0,
                totalFinded: 0
            }
        }
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
            forms: {
                ...initialState.forms,
                profile: {
                    ...initialState.forms.profile,
                    state: {
                        edit: false,
                        view: true
                    }
                }
            }
        });
        expect(
            reducer(initialState, {type: types.CHANGE_USER_PROFILE_FORM_EDIT_STATE, state: true })
        ).toEqual({
            ...initialState,
            forms: {
                ...initialState.forms,
                profile: {
                    ...initialState.forms.profile,
                    state: {
                        edit: true,
                        view: false
                    }
                }
            }
        });
    });
    it('CHANGE_USER_PROFILE_FORM_VIEW_STATE action test', () => {
        expect(
            reducer(initialState, {type: types.CHANGE_USER_PROFILE_FORM_VIEW_STATE, state: false })
        ).toEqual({
            ...initialState,
            forms: {
                ...initialState.forms,
                profile: {
                    ...initialState.forms.profile,
                    state: {
                        edit: true,
                        view: false
                    }
                }
            }
        });
        expect(
            reducer(initialState, {type: types.CHANGE_USER_PROFILE_FORM_VIEW_STATE, state: true })
        ).toEqual({
            ...initialState,
            forms: {
                ...initialState.forms,
                profile: {
                    ...initialState.forms.profile,
                    state: {
                        edit: false,
                        view: true
                    }
                }
            }
        }); 
    });
    it('CHANGE_USER_PROFILE_FORM_MODAL_STATE action test', () => {
        expect(
            reducer(initialState, {type: types.CHANGE_USER_PROFILE_FORM_MODAL_STATE, modalState: { imageUpload: true } })
        ).toEqual({
            ...initialState,
            forms: {
                ...initialState.forms,
                profile: {
                    ...initialState.forms.profile,
                    modals: {
                        imageUpload: true
                    }
                }
            }
        });
        expect(
            reducer(initialState, {type: types.CHANGE_USER_PROFILE_FORM_MODAL_STATE, modalState: { imageUpload: false } })
        ).toEqual({
            ...initialState,
            forms: {
                ...initialState.forms,
                profile: {
                    ...initialState.forms.profile,
                    modals: {
                        imageUpload: false
                    }
                }
            }
        }); 
    });
});
