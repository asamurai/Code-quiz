import {
    NOTIFICATION_CLOSE_MESSAGE,
    NOTIFICATION_SHOW_ERROR_MESSAGE,
    NOTIFICATION_SHOW_INFO_MESSAGE,
    NOTIFICATION_SHOW_SUCCESS_MESSAGE
} from './../../constants/container_constants/notifications';

export const showSuccessMessage = ({ message }) => ({
    type: NOTIFICATION_SHOW_SUCCESS_MESSAGE,
    message
});

export const showErrorMessage = ({ message }) => ({
    type: NOTIFICATION_SHOW_ERROR_MESSAGE,
    message
});

export const showInfoMessage = ({ message }) => ({
    type: NOTIFICATION_SHOW_INFO_MESSAGE,
    message
});

export const closeMessage = () => ({
    type: NOTIFICATION_CLOSE_MESSAGE
});
