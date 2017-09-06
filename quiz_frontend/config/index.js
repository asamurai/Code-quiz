let config = null;

switch (process.env.NODE_ENV) {
    case 'production':
        config = require('./config.prod.json');
        break;
    case 'development':
    case 'test':
    default:
        config = require('./config.dev.json');
        break;
}
    
module.exports = config;