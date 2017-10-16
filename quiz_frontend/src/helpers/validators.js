const emailValidator = (rule, value = '', callback) => {
    if (value.length > 0) {
        const regex = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regex.test(value)) {
            callback('Email should be valid.');
        }
    }
    callback();
    return;
};

export default {
    emailValidator
};
