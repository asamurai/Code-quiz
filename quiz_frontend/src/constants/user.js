import { createRequestTypes } from './../helpers';

export const USER_SIGNIN = createRequestTypes('USER_SIGNIN');
export const USER_SIGNOUT = createRequestTypes('USER_SIGNOUT');
export const USER_REGISTER = createRequestTypes('USER_REGISTER');

export const CHANGE_FORM_EDIT_STATE = 'CHANGE_FORM_EDIT_STATE';
export const CHANGE_FORM_VIEW_STATE = 'CHANGE_FORM_VIEW_STATE';
