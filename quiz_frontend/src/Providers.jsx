import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import {
    LocaleProvider
} from 'antd';

import Application from './containers/Application';
import { ScrollToTopComponent } from './components/HOCs';

import AntdLocalizationEn from './constants/locale/AntdLocalizationEn';

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
                    <LocaleProvider locale={AntdLocalizationEn} >
                        <ScrollToTopComponent>
                            <Application/>
                        </ScrollToTopComponent>
                    </LocaleProvider>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default Providers;

