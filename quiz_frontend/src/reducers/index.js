import { combineReducers } from 'redux';

import user from './user';
import notifications from './notifications';
import fullquizzes from './fullquizes';
import quizzes from './quizzes';
import home from './home';
import faq from './faq';

export default combineReducers({
    user,
    fullquizzes,
    notifications,
    quizzes,
    home,
    faq
});
