import { createRequestTypes } from './../../helpers';

export const CREATE_QUIZ_SESSION = createRequestTypes('CREATE_QUIZ_SESSION');

export const DELETE_QUIZ_SESSION = createRequestTypes('DELETE_QUIZ_SESSION');

export const GET_QUIZ_LEVEL = createRequestTypes('GET_QUIZ_LEVEL');

export const GET_QUIZ_RESULTS = createRequestTypes('GET_QUIZ_RESULTS');

export const GET_QUIZZES_BY_USER_ID = createRequestTypes('GET_QUIZZES_BY_USER_ID');

export const SET_QUIZZES_REQUEST_BODY = 'SET_QUIZZES_REQUEST_BODY';

export const SET_QUIZZES_PAGES = 'SET_QUIZZES_PAGES';

export const RESET_QUIZZES_ERRORS = 'RESET_QUIZZES_ERRORS';

export const RESET_QUIZ_TRAINING = 'RESET_QUIZ_TRAINING';

export const RESET_QUIZ_CREATE_FORM = 'RESET_QUIZ_CREATE_FORM';

export const RESET_QUIZ_LIST = 'RESET_QUIZ_LIST';
