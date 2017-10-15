import { combineReducers } from 'redux';

import user from './user';
import notifications from './notifications';

export default combineReducers({
    user,
    notifications
});
