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
export const FULL_QUIZZES_FULL_PATH = `${FULL_QUIZZES_PATH}/:component`;
export const FULL_QUIZZES_QUIZ_DETAILS_PATH = `${FULL_QUIZZES_PATH}/quiz`;
export const FULL_QUIZZES_FRAMEWORK_PATH = `${FULL_QUIZZES_PATH}/${quizCategoryNames.FRAMEWORK}`;
export const FULL_QUIZZES_LIBRARY_PATH = `${FULL_QUIZZES_PATH}/${quizCategoryNames.LIBRARY}`;
export const FULL_QUIZZES_LANGUAGE_PATH = `${FULL_QUIZZES_PATH}/${quizCategoryNames.LANGUAGE}`;
export const FULL_QUIZZES_TOOL_PATH = `${FULL_QUIZZES_PATH}/${quizCategoryNames.TOOL}`;
export const FULL_QUIZZES_PLATFORM_PATH = `${FULL_QUIZZES_PATH}/${quizCategoryNames.PLATFORM}`;

/**
 * QUIZ ROUTE
 * 
 */
export const QUIZ_PATH = '/quiz';
export const QUIZ_FULL_PATH = `${QUIZ_PATH}/:component?/:id?`;
export const QUIZ_TRAINING_PATH = `${QUIZ_PATH}/training`;
export const QUIZ_CREATE_PATH = `${QUIZ_PATH}/create`;
export const QUIZ_EDIT_PATH = `${QUIZ_PATH}/edit`;
export const QUIZ_LIST_PATH = `${QUIZ_PATH}/list`;

/**
 * PRIVATE ROUTES
 * 
 */
export const USER_PATH = '/user';
export const USER_FULL_PATH = `${USER_PATH}/:component?/:id?`;
export const USER_ACCOUNT_PATH = `${USER_PATH}/account`;
export const USER_SETTINGS_PATH = `${USER_PATH}/settings`;
export const USER_STATISTICS_PATH = `${USER_PATH}/statistics`;
export const USER_QUIZ_LIST_PATH = `${USER_PATH}/quiz-list`;
