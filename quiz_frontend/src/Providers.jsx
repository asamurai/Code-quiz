import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Application from './containers/Application';
import ScrollToTop from './components/ScrollToTopComponent';

import configureStore from './store';

const store = configureStore();

/**
 * Providers container
 * 
 * Pack of HOCs for main Application container.
 * 
 * @class Providers
 * @extends {Component}
 */
class Providers extends Component {
    render () {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <ScrollToTop>
                        <Application/>
                    </ScrollToTop>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default Providers;

