import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Application from './Application.jsx';

class Router extends Component {
    render () {
        return (
            <BrowserRouter>
                <Application/>
            </BrowserRouter>
        );
    }
}

export default Router;

