import {
    USER_SIGNIN,
    USER_SIGNOUT,
    USER_REGISTER
} from './../../constants';
import { saveToken, removeToken, withAuth } from './../../api';

export const signIn = credentials => async dispatch => {
    try {
        await dispatch({
            type: USER_SIGNIN.REQUEST
        });
        const { data } = await withAuth('post','/signin', credentials);
        await saveToken(data.token);
        await dispatch({
            type: USER_SIGNIN.SUCCESS,
            data
        });
    } catch (error) {
        await dispatch({
            type: USER_SIGNIN.ERROR,
            error: error.message
        });          
    }
};

export const signUp = credentials => async dispatch => {
    try {
        await dispatch({
            type: USER_REGISTER.REQUEST
        });
        const { data } = await withAuth('post','/signup', credentials);
        await dispatch({
            type: USER_REGISTER.SUCCESS,
            data
        });
        await signIn(data);
    } catch (error) {
        await dispatch({
            type: USER_REGISTER.ERROR,
            error: error.message
        });          
    }
};

export const signOut = credentials => async dispatch => {
    try {
        await dispatch({
            type: USER_SIGNOUT.REQUEST
        }); 
        await withAuth('post','/signout', credentials);
        await removeToken();
        await dispatch({
            type: USER_SIGNOUT.SUCCESS
        });        
    } catch (error) {
        await dispatch({
            type: USER_SIGNOUT.ERROR,
            error: error.message
        });       
    }
};
