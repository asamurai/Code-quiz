import * as userTypes from './../../constants/user';
import * as notifyTypes from './../../constants/notifications';
import { 
    saveToken,
    removeToken,
    withAuth 
} from './../../api';

const types = {
    ...userTypes,
    ...notifyTypes
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
            type: types.USER_SIGNIN.ERROR,
            error: error.message
        });  
        await dispatch({
            type: types.NOTIFICATION_SHOW_ERROR_MESSAGE,
            message: error.message
        });        
    }
};

export const signUp = credentials => async dispatch => {
    try {
        await dispatch({
            type: types.USER_REGISTER.REQUEST
        });
        const { data } = await withAuth('post','/register/', credentials);
        await dispatch({
            type: types.USER_REGISTER.SUCCESS,
            data
        });
    } catch (error) {
        await dispatch({
            type: types.USER_SIGNIN.ERROR,
            error: error.message
        });  
        await dispatch({
            type: types.NOTIFICATION_SHOW_ERROR_MESSAGE,
            message: error.message
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
            type: types.USER_SIGNIN.ERROR,
            error: error.message
        });  
        await dispatch({
            type: types.NOTIFICATION_SHOW_ERROR_MESSAGE,
            message: error.message
        });     
    }
};

export const setUserFormEditState = state => async dispatch => {
    dispatch({
        type: types.CHANGE_FORM_EDIT_STATE,
        state
    });
};

export const setUserFormViewState = state => dispatch => {
    dispatch({
        type: types.CHANGE_FORM_VIEW_STATE,
        state
    }); 
};
