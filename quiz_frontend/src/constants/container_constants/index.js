import * as notifications from './notifications';
import * as user from './user';
import * as fullquizzes from './fullquizzes';
import * as quizzes from './quizzes';

export default {
    ...notifications,
    ...user,
    ...fullquizzes,
    ...quizzes
};
