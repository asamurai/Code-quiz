import * as routes from './index.js';
import * as quizzesCategoryNames from './../constants/quizzesCategoryNames';

export default [
    {
        key: 0,
        route: routes.FULL_QUIZZES_LANGUAGE_PATH,
        label: quizzesCategoryNames.LANGUAGE,
    },
    {
        key: 1,
        route: routes.FULL_QUIZZES_FRAMEWORK_PATH,
        label: quizzesCategoryNames.FRAMEWORK
    },
    {
        key: 2,
        route: routes.FULL_QUIZZES_LIBRARY_PATH,
        label: quizzesCategoryNames.LIBRARY
    },
    {
        key: 3,
        route: routes.FULL_QUIZZES_PLATFORM_PATH,
        label: quizzesCategoryNames.PLATFORM
    },
    {
        key: 4,
        route: routes.FULL_QUIZZES_TOOL_PATH,
        label: quizzesCategoryNames.TOOL
    }
];
