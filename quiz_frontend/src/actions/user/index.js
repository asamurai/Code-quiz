import * as userTypes from './../../constants/container_constants/user';
import { 
    saveToken,
    removeToken,
    withAuth 
} from './../../api';

import {
    setAuthDataIntoStorage,
    removeAuthDataFromStorage
} from './../../helpers/localStorageHelpers';

const types = {
    ...userTypes
};

export const signIn = credentials => async dispatch => {
    try {
        await dispatch({
            type: types.USER_SIGNIN.REQUEST
        });
        const {
            data: {
                data,
                token
            }
        } = await withAuth('post','/login/', credentials);
        await dispatch({
            type: types.USER_SIGNIN.SUCCESS,
            data,
            token
        });
        await saveToken(token);
        await setAuthDataIntoStorage({data, token});
    } catch (error) {
        await dispatch({
            type: types.USER_SIGNIN.FAILURE,
            title: 'Login error!',
            error: error.response.data.error.errors.map(el => Object.values(el)[0]).join(',')
        });        
    }
};

export const signUp = credentials => async dispatch => {
    try {
        await dispatch({
            type: types.USER_REGISTER.REQUEST
        });
        const { data: { message } } = await withAuth('post','/register/', credentials);
        await dispatch({
            type: types.USER_REGISTER.SUCCESS,
            title: 'Registration succeed!',
            message
        });
    } catch (error) {
        await dispatch({
            type: types.USER_REGISTER.FAILURE,
            title: 'Registration error!',
            error: error.response.data.error.errors.map(el => Object.values(el)[0]).join(',')
        });        
    }
};

export const signOut = credentials => async dispatch => {
    try {
        await dispatch({
            type: types.USER_SIGNOUT.REQUEST
        }); 
        await withAuth('post','/logout/', credentials);
        await dispatch({
            type: types.USER_SIGNOUT.SUCCESS
        });
        await removeToken();     
        await removeAuthDataFromStorage();
    } catch (error) {
        await dispatch({
            type: types.USER_SIGNIN.FAILURE,
            error: error.message
        });   
    }
};

export const updateUser = (id, userData) => async dispatch => {
    try {
        await dispatch({
            type: types.USER_UPDATE.REQUEST
        }); 
        const { data } = await withAuth('put',`/user/id/${id}/`, userData);
        await dispatch({
            type: types.USER_UPDATE.SUCCESS,
            data,
            title: 'Update succeed!',
            message: 'User data updated successfully.'
        });       
        await dispatch({
            type: types.CHANGE_USER_PROFILE_FORM_EDIT_STATE,
            state: false
        });    
    } catch (error) {
        await dispatch({
            type: types.USER_UPDATE.FAILURE,
            error: error.message
        });  
    }
};

export const updateUserPassword = (id, userData) => async dispatch => {
    try {
        await dispatch({
            type: types.USER_PASSWORD_CHANGE.REQUEST
        }); 
        await withAuth('put',`/user/id/${id}/change-password/`, userData);
        await dispatch({
            type: types.USER_PASSWORD_CHANGE.SUCCESS,
            title: 'Update succeed!',
            message: 'User password updated successfully.'
        });                 
    } catch (error) {
        await dispatch({
            type: types.USER_PASSWORD_CHANGE.FAILURE,
            error: error.message
        });    
    }
};

export const updateUserEmail = (id, userData) => async dispatch => {
    try {
        await dispatch({
            type: types.USER_EMAIL_CHANGE.REQUEST
        }); 
        await withAuth('put',`/user/id/${id}/`, userData);
        await dispatch({
            type: types.USER_EMAIL_CHANGE.SUCCESS,
            title: 'Update succeed!',
            message: 'Email changed successfully.'
        });                 
    } catch (error) {
        await dispatch({
            type: types.USER_EMAIL_CHANGE.FAILURE,
            error: error.message
        });     
    }
};

export const setUserImage = (id, newPicture, isPrevPicture) => async dispatch => {
    try {
        await dispatch({
            type: types.USER_SET_PICTURE.REQUEST
        }); 
        if (isPrevPicture) {
            await dispatch({
                type: types.USER_DELETE_PICTURE.REQUEST
            }); 
            await withAuth('delete',`/photo/user/${id}`);
            await dispatch({
                type: types.USER_DELETE_PICTURE.SUCCESS
            }); 
        }
        const data = await withAuth('post',`/photo/upload/user/${id}`, newPicture);
        await dispatch({
            type: types.USER_SET_PICTURE.SUCCESS,
            data,
            title: 'Update succeed!',
            message: 'Profile image updated successfully.'
        }); 
        await dispatch({
            type: types.CHANGE_USER_PROFILE_FORM_MODAL_STATE,
            modalState: {
                imageUpload: false
            }
        });              
    } catch (error) {
        await dispatch({
            type: types.USER_SET_PICTURE.FAILURE,
            error: error.message
        });    
    }
};

export const setExistingUserData = (authData) => dispatch => {
    dispatch({
        type: types.SET_EXISTING_USER_DATA,
        data: authData.data,
        token: authData.token
    });
    saveToken(authData.token);
};

export const setUserFormEditState = state => dispatch => dispatch({
    type: types.CHANGE_USER_PROFILE_FORM_EDIT_STATE,
    state
});

export const setUserFormViewState = state => dispatch => dispatch({
    type: types.CHANGE_USER_PROFILE_FORM_VIEW_STATE,
    state
});

export const setUserFormModalsState = (modalName, state)=> dispatch => dispatch({
    type: types.CHANGE_USER_PROFILE_FORM_MODAL_STATE,
    modalState: {
        [modalName]: state
    }
});

export const resetUserErrorState = () => dispatch => dispatch({
    type: types.RESET_USER_ERRORS
});
