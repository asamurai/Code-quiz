import { createRequestTypes } from './../../helpers';

export const CREATE_QUIZ_SESSION = createRequestTypes('CREATE_QUIZ_SESSION');

export const CREATE_QUIZ = createRequestTypes('CREATE_QUIZ');

export const UPDATE_QUIZ = createRequestTypes('UPDATE_QUIZ');

export const DELETE_QUIZ_SESSION = createRequestTypes('DELETE_QUIZ_SESSION');

export const DELETE_QUIZ_BY_QUIZ_ID = createRequestTypes('DELETE_QUIZ_BY_QUIZ_ID');

export const GET_QUIZ_LEVEL = createRequestTypes('GET_QUIZ_LEVEL');

export const GET_QUIZ_RESULTS = createRequestTypes('GET_QUIZ_RESULTS');

export const GET_QUIZZES_BY_USER_ID = createRequestTypes('GET_QUIZZES_BY_USER_ID');

export const GET_QUIZ_BY_ID = createRequestTypes('GET_QUIZ_BY_ID');

export const CREATE_QUESTION = createRequestTypes('CREATE_QUESTION');

export const UPDATE_QUESTION = createRequestTypes('UPDATE_QUESTION');

export const DELETE_QUESTION = createRequestTypes('DELETE_QUESTION');

export const SET_QUESTION_DATA = 'SET_QUESTION_DATA';

export const CHANGE_QUIZZES_CREATE_FORM_STATE = 'CHANGE_QUIZZES_CREATE_FORM_STATE';

export const CHANGE_QUESTION_CREATE_FORM_STATE = 'CHANGE_QUESTION_CREATE_FORM_STATE';

export const SET_QUIZZES_REQUEST_BODY = 'SET_QUIZZES_REQUEST_BODY';

export const SET_QUIZZES_PAGES = 'SET_QUIZZES_PAGES';

export const SET_QUIZ_MAX_LEVELS = 'SET_QUIZ_MAX_LEVELS';

export const RESET_QUIZZES_ERRORS = 'RESET_QUIZZES_ERRORS';

export const RESET_QUIZ_TRAINING = 'RESET_QUIZ_TRAINING';

export const RESET_QUIZ_CREATE_FORM = 'RESET_QUIZ_CREATE_FORM';

export const RESET_QUESTION_CREATE_FORM = 'RESET_QUESTION_CREATE_FORM';

export const RESET_QUIZ_LIST = 'RESET_QUIZ_LIST';
