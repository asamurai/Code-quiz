import types from './../constants/container_constants';
import * as notifications from './../constants/container_constants/notifications';
import * as fullquizzes from './../constants/container_constants/fullquizzes';
import * as quizzes from './../constants/container_constants/quizzes';
import * as user from './../constants/container_constants/user';

/**
 * Array of async container constants, that need to be checked in middleware
 */
const asyncTypesConstants = Object.values(types)
    .filter(type => typeof(type) === 'object')
    .reduce((arr, type) => ([
        ...arr,
        ...Object.values(type)
    ]), []);

/**
 * List of async constants that need to be ignored
 */
const EXCEPTION_LIST = [
    fullquizzes.GET_TOPICS_BY_CATEGORY.SUCCESS,
    fullquizzes.GET_QUIZZES_BY_TOPIC.SUCCESS,
    fullquizzes.GET_TOPIC_INFO_BY_TOPIC_ID.SUCCESS,
    quizzes.GET_QUIZZES_BY_USER_ID.SUCCESS,
    quizzes.GET_QUIZ_BY_ID.SUCCESS,
    user.USER_SIGNIN.SUCCESS,
    user.USER_SIGNOUT.SUCCESS
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


/**
 * 
 * Middleware that checks if there is success or failure action and shows notification due to its status
 * 
 * @param {object}   store   current store
 * @param {function} next    function that that ignores current action and passing to next action
 * @param {object}   action  action that is passing
 *  
 */
export const notificationMiddleware = store => next => action => {
    if (SUCCESS_ACTIONS.includes(action.type)) {
        store.dispatch({ 
            type: notifications.NOTIFICATION_SHOW_SUCCESS_MESSAGE,
            title: action.title || 'Success!' , 
            message: action.message || 'Success!'
        });
    }
    if (FAILURE_ACTIONS.includes(action.type)) {
        store.dispatch({ 
            type: notifications.NOTIFICATION_SHOW_ERROR_MESSAGE,
            title: action.title || 'Failure!' ,
            message: action.error || 'Failure!' 
        });   
    }
    next(action);
};
