import { combineReducers } from 'redux';

import user from './user';
import notifications from './notifications';
import fullquizzes from './fullquizes';

export default combineReducers({
    user,
    fullquizzes,
    notifications
});
