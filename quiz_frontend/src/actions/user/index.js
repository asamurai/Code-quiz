import * as userTypes from './../../constants/container_constants/user';
import { 
    saveToken,
    removeToken,
    withAuth 
} from './../../api';

const types = {
    ...userTypes
};

export const signIn = credentials => async dispatch => {
    try {
        await dispatch({
            type: types.USER_SIGNIN.REQUEST
        });
        const { data } = await withAuth('post','/api-token-auth/', credentials);
        await saveToken(data.token);
        await dispatch({
            type: types.USER_SIGNIN.SUCCESS,
            data
        });
    } catch (error) {
        await dispatch({
            type: types.USER_SIGNIN.FAILURE,
            error: error.message
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
            message
        });
    } catch (error) {
        await dispatch({
            type: types.USER_SIGNIN.FAILURE,
            error: error.message
        });        
    }
};

export const signOut = credentials => async dispatch => {
    try {
        await dispatch({
            type: types.USER_SIGNOUT.REQUEST
        }); 
        await withAuth('post','/logout/', credentials);
        await removeToken();
        await dispatch({
            type: types.USER_SIGNOUT.SUCCESS
        });        
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
        const { data } = await withAuth('put',`/user/id/${id}`, userData);
        await dispatch({
            type: types.USER_UPDATE.SUCCESS,
            data
        });       
        await dispatch({
            type: types.CHANGE_USER_PROFILE_EDIT_STATE,
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
            type: types.USER_PASSWORD_CHANGE.SUCCESS
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
        await withAuth('put',`/user/id/${id}/change-email/`, userData);
        await dispatch({
            type: types.USER_EMAIL_CHANGE.SUCCESS
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
            data
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

export const setUserFormEditState = state => async dispatch => {
    dispatch({
        type: types.CHANGE_USER_PROFILE_FORM_EDIT_STATE,
        state
    });
};

export const setUserFormViewState = state => dispatch => {
    dispatch({
        type: types.CHANGE_USER_PROFILE_FORM_VIEW_STATE,
        state
    }); 
};

export const setUserFormModalsState = (modalName, state)=> dispatch => {
    dispatch({
        type: types.CHANGE_USER_PROFILE_FORM_MODAL_STATE,
        modalState: {
            [modalName]: state
        }
    }); 
};

export const resetUserErrorState = () => ({
    type: types.RESET_USER_ERRORS
});
