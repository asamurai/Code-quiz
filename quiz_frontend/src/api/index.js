import config from './../../config';

const urlFormatter = url => `${config.global.api.url}/${url}`;

export default urlFormatter;
