import {
    // USER_SIGNIN,
    USER_SIGNOUT,
    // USER_REGISTER
} from './../../constants';

import { wait } from './../../utils';

export const signOut = () => async dispatch => {
    try {
        await dispatch({
            type: USER_SIGNOUT.REQUEST
        }); 
        await wait();
        await dispatch({
            type: USER_SIGNOUT.SUCCESS
        });        
    } catch (error) {
        await dispatch({
            type: USER_SIGNOUT.ERROR,
            error: error
        });       
    }
};
