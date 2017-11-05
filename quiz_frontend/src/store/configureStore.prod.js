import {createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './../reducers';

import { notificationMiddleware } from './../middleware/notification';

const configureStore = initialState => {

    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(
            thunk,
            notificationMiddleware
        )
    );

    return store;
};

export default configureStore;

