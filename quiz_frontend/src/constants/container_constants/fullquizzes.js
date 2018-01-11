import { createRequestTypes } from './../../helpers';

export const GET_TOPICS_BY_CATEGORY = createRequestTypes('GET_TOPICS_BY_CATEGORY');
export const GET_QUIZZES_BY_TOPIC = createRequestTypes('GET_QUIZZES_BY_TOPIC');
export const GET_TOPIC_INFO_BY_TOPIC_ID = createRequestTypes('GET_TOPIC_INFO_BY_TOPIC_ID');

export const CLEAR_QUIZZES_BY_TOPIC = 'CLEAR_QUIZZES_BY_TOPIC';
export const CLEAR_TOPIC_INFO = 'CLEAR_TOPIC_INFO';
