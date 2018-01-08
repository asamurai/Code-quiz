import { createRequestTypes } from './../../helpers';

export const GET_TOPICS_BY_CATEGORY = createRequestTypes('GET_TOPICS_BY_CATEGORY');

export const GET_QUIZZES_BY_TOPIC = createRequestTypes('GET_QUIZZES_BY_TOPIC');

export const CLEAR_QUIZZES_BY_TOPIC = 'CLEAR_QUIZZES_BY_TOPIC';
