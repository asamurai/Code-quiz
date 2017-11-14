import { combineReducers } from 'redux';
import * as roles from './../constants/userRoles';

import user from './user';
import notifications from './notifications';
import fullquizzes from './fullquizes';

export default combineReducers({
    user,
    fullquizzes,
    notifications
});

export const isUserHavePermissions = (state, role) => {
    switch (role) {
        case roles.USER_ROLE:
            return state.user.role === 1;
        case roles.USER_CREATOR_ROLE:
            return state.user.role === 2;  
        case roles.ADMIN_ROLE:
            return state.user.role === 3;
        default:
            return false;
    }
};
