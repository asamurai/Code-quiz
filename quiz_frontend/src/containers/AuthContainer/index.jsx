import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SignIn from './../../components/Authorization/SignIn';
import SignUp from './../../components/Authorization/SignUp';

import * as routes from './../../routes';
import {
    signIn,
    signUp
} from './../../actions/user';

class AuthContainer extends Component {
    constructor(props){
        super(props);
        this.handleSignIn = this.props.signIn.bind(this);
        this.handleSignUp = this.props.signUp.bind(this);
    }

    render () {
        const {
            match: {
                url
            },
            user: {
                loading
            }
        } = this.props;

        if(url.includes(routes.SIGNIN_PATH)){
            return (
                <SignIn
                    loading={loading}
                    onSignIn={this.handleSignIn}
                />
            );
        }
        
        if(url.includes(routes.SIGNUP_PATH)){
            return (
                <SignUp
                    loading={loading}  
                    onSignUp={this.handleSignUp}  
                />
            );
        }
        
        return(
            <span/>
        );
    }
}

AuthContainer.propTypes = {
    user: PropTypes.objectOf(PropTypes.any).isRequired
};

const mapStateToProps = (state) => ({
    user: state.user
});
  
const mapDispatchToProps = (dispatch) => {
    return {
        signIn: bindActionCreators(signIn, dispatch),
        signUp: bindActionCreators(signUp, dispatch)
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
