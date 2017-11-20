import { combineReducers } from 'redux';

import user from './user';
import notifications from './notifications';
import fullquizzes from './fullquizes';
import quizzes from './quizzes';

export default combineReducers({
    user,
    fullquizzes,
    notifications,
    quizzes
});
