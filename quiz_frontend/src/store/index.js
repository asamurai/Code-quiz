let configureStoreEnvConfig = null;

switch (process.env.NODE_ENV) {
    case 'production':
        configureStoreEnvConfig = require('./configureStore.dev.js');
        break;
    case 'test':
    case 'development':
    default:
        configureStoreEnvConfig = require('./configureStore.dev.js');
        break;
}

module.exports = configureStoreEnvConfig;

