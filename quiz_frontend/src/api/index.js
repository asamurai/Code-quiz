import config from './../../config';

const urlFormatter = url => {
    return `${config.global.api.url}/${url}`;
};

export default urlFormatter;
