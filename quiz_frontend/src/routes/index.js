import * as quizCategoryNames from './../constants/quizzesCategoryNames';
/**
 * PUBLIC ROUTES
 * 
 */
export const HOME_PATH = '/';
export const FREE_QUIZZES_PATH = '/free-quizzes';
export const SIGNIN_PATH = '/signin';
export const SIGNUP_PATH = '/signup';
export const FAQ_PATH = '/faq';

/**
 * FULL QUIZZES ROUTES
 * 
 */

export const FULL_QUIZZES_PATH = '/full-quizzes';
export const FULL_QUIZZES_QUIZ_DETAILS_PATH = '/full-quizzes/quiz';
export const FULL_QUIZZES_FRAMEWORK_PATH = `/full-quizzes/${quizCategoryNames.FRAMEWORK}`;
export const FULL_QUIZZES_LIBRARY_PATH = `/full-quizzes/${quizCategoryNames.LIBRARY}`;
export const FULL_QUIZZES_LANGUAGE_PATH = `/full-quizzes/${quizCategoryNames.LANGUAGE}`;
export const FULL_QUIZZES_TOOL_PATH = `/full-quizzes/${quizCategoryNames.TOOL}`;
export const FULL_QUIZZES_PLATFORM_PATH = `/full-quizzes/${quizCategoryNames.PLATFORM}`;

/**
 * QUIZ ROUTE
 * 
 */

export const QUIZ_ROUTE = '/quiz';
export const QUIZ_ROUTE_TRAINING_PATH = `${QUIZ_ROUTE}/training`;
export const QUIZ_ROUTE_CREATE_PATH = `${QUIZ_ROUTE}/create`;
export const QUIZ_ROUTE_EDIT_PATH = `${QUIZ_ROUTE}/edit`;

/**
 * PRIVATE ROUTES
 * 
 */
export const USER_ACCOUNT_PATH = '/user/account';
export const USER_SETTINGS_PATH = `/user/settings`;
export const USER_STATISTICS_PATH = `/user/statistics`;
