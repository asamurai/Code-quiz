import React, { Component } from 'react';

class AuthContainer extends Component {
    render () {
        const location = this.props.location.pathname;
        if(location.includes('signin')){
            return (
                <div>
                    Sign In
                </div>
            );
        }
        if(location.includes('signup')){
            return (
                <div>
                    Sign up
                </div>
            );
        }
        return(
            <span/>
        );
    }
}

export default AuthContainer;
