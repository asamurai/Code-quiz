import * as routes from './index.js';
import * as navNames from './../constants/navigationTopNames';

export default [
    {
        route: routes.FULL_QUIZZES_PATH,
        label: navNames.FULL_QUIZZES,
        permitions: '*',
        auth: false
    },
    {
        route: routes.FAQ_PATH,
        label: navNames.FAQ,
        permitions: '*',
        auth: false
    },
    {
        route: routes.QUIZ_PATH,
        label: navNames.QUIZ,
        permitions: '*',
        auth: true        
    }
];
