import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Application from './containers/Application';
import { ScrollToTopComponent } from './components/HOCs';

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
                    <ScrollToTopComponent>
                        <Application/>
                    </ScrollToTopComponent>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default Providers;

