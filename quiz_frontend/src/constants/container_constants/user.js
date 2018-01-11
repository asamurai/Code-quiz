import { createRequestTypes } from './../../helpers';

export const USER_SIGNIN = createRequestTypes('USER_SIGNIN');
export const USER_SIGNOUT = createRequestTypes('USER_SIGNOUT');
export const USER_REGISTER = createRequestTypes('USER_REGISTER');
export const USER_UPDATE = createRequestTypes('USER_UPDATE');
export const USER_PASSWORD_CHANGE = createRequestTypes('USER_PASSWORD_CHANGE');
export const USER_EMAIL_CHANGE = createRequestTypes('USER_EMAIL_CHANGE');
export const USER_SET_PICTURE = createRequestTypes('USER_SET_PICTURE');
export const USER_DELETE_PICTURE = createRequestTypes('USER_DELETE_PICTURE');
export const GET_USER_PASSED_QUIZZES = createRequestTypes('GET_USER_PASSED_QUIZZES');

export const SET_EXISTING_USER_DATA = 'SET_EXISTING_USER_DATA';
export const CHANGE_USER_PROFILE_FORM_EDIT_STATE = 'CHANGE_USER_PROFILE_FORM_EDIT_STATE';
export const CHANGE_USER_PROFILE_FORM_VIEW_STATE = 'CHANGE_USER_PROFILE_FORM_VIEW_STATE';
export const CHANGE_USER_PROFILE_FORM_MODAL_STATE = 'CHANGE_USER_PROFILE_FORM_MODAL_STATE';
export const RESET_USER_ERRORS = 'RESET_USER_ERRORS';
