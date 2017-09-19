import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Application from './Application.jsx';

class Providers extends Component {
    render () {
        return (
            <BrowserRouter>
                <Application/>
            </BrowserRouter>
        );
    }
}

export default Providers;

