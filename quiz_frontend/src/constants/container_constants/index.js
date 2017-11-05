import * as notifications from './notifications';
import * as user from './user';
import * as fullquizzes from './fullquizzes';

export default {
    ...notifications,
    ...user,
    ...fullquizzes
};
