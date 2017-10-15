import React, { Component } from 'react';

import SignIn from './../../components/Authorization/SignIn';
import SignUp from './../../components/Authorization/SignUp';

import * as routes from './../../routes';

class AuthContainer extends Component {
    render () {
        const {
            match: {
                url
            }
        } = this.props;

        if(url.includes(routes.SIGNIN_PATH)){
            return <SignIn/>;
        }
        if(url.includes(routes.SIGNUP_PATH)){
            return <SignUp/>;
        }
        
        return(
            <span/>
        );
    }
}

export default AuthContainer;
