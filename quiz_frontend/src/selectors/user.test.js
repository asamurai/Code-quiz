import {
    isUserHavePermissions
} from './user';

import * as roles from './../constants/userRoles';

describe('isUserHavePermissions selector test', () => {
    it(`${roles.USER_ROLE} role test true` , () => {
        const state = {
            user: {
                role: 1
            }
        };
        expect(isUserHavePermissions(state, roles.USER_ROLE)).toBeTruthy();
    });
    it(`${roles.USER_ROLE} role test false` , () => {
        const state = {
            user: {
                role: 2
            }
        };
        expect(isUserHavePermissions(state, roles.USER_ROLE)).toBeFalsy();
    });
    it(`${roles.USER_CREATOR_ROLE} role test true` , () => {
        const state = {
            user: {
                role: 2
            }
        };
        expect(isUserHavePermissions(state, roles.USER_CREATOR_ROLE)).toBeTruthy();        
    });
    it(`${roles.USER_CREATOR_ROLE} role test false` , () => {
        const state = {
            user: {
                role: 3
            }
        };
        expect(isUserHavePermissions(state, roles.USER_CREATOR_ROLE)).toBeFalsy();        
    });
    it(`${roles.ADMIN_ROLE} role test true` , () => {
        const state = {
            user: {
                role: 3
            }
        };
        expect(isUserHavePermissions(state, roles.ADMIN_ROLE)).toBeTruthy();        
    });
    it(`${roles.ADMIN_ROLE} role test false` , () => {
        const state = {
            user: {
                role: 2
            }
        };
        expect(isUserHavePermissions(state, roles.ADMIN_ROLE)).toBeFalsy();        
    });
});
