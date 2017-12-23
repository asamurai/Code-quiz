import * as roles from './../constants/userRoles';

/**
 * Selector for checking user permissions
 * 
 * @param {object} state redux state
 * @param {string} role  user role
 */
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
