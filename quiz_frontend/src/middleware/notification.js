import types from './../constants/container_constants';
import * as notifications from './../constants/container_constants/notifications';
import * as fullquizzes from './../constants/container_constants/fullquizzes';
import * as user from './../constants/container_constants/user';

const asyncTypesConstants = Object.values(types)
.filter(type => typeof(type) === 'object')
.reduce((arr, type) => ([
    ...arr,
    ...Object.values(type)
]), []);

const EXCEPTION_LIST = [
    fullquizzes.GET_QUIZZES_BY_TYPE.SUCCESS,
    user.USER_SIGNIN.SUCCESS,
    user.USER_SIGNOUT.SUCCESS,
    user.USER_UPDATE.SUCCESS,
    user.USER_PASSWORD_CHANGE.SUCCESS,
    user.USER_EMAIL_CHANGE.SUCCESS
];

const SUCCESS_ACTIONS = asyncTypesConstants.filter((item) => (
    !EXCEPTION_LIST.includes(item) &&
    !Object.values(notifications).includes(item) &&
    /_SUCCESS/.test(item)
));

const FAILURE_ACTIONS = asyncTypesConstants.filter((item) => (
    !EXCEPTION_LIST.includes(item) &&
    !Object.values(notifications).includes(item) &&
    /_FAILURE/.test(item)
));

export const notificationMiddleware = store => next => action => {
    if (SUCCESS_ACTIONS.includes(action.type)) {
        store.dispatch({ 
            type: notifications.NOTIFICATION_SHOW_SUCCESS_MESSAGE, 
            message: action.message || 'Success!'
        });
    }
    if (FAILURE_ACTIONS.includes(action.type)) {
        store.dispatch({ 
            type: notifications.NOTIFICATION_SHOW_ERROR_MESSAGE,
            message: action.error || 'Failure!' 
        });   
    }
    next(action);
};
