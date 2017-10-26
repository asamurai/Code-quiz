import {createStore, applyMiddleware, compose} from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './../reducers';

const configureStore = initialState => {
    const logger = createLogger();
    
    const enhancer = compose(
        applyMiddleware(thunk, logger),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    );

    const store = createStore(
        rootReducer,
        initialState,
        enhancer
    );

    if (module.hot) {
        module.hot.accept('./../reducers', () => {
            const nextRootReducer = require('./../reducers').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
};

export default configureStore;

