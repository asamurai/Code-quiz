let webpackEnvConfig = null;

switch (process.env.NODE_ENV) {
    case 'production':
        webpackEnvConfig = require('./webpackEnvConfig.prod.js');
        break;
    case 'development':
    case 'test':
    default:
        webpackEnvConfig = require('./webpackEnvConfig.dev.js');
        break;
}
    
module.exports = webpackEnvConfig;