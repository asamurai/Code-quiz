import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { Button } from './../../ui';

import {
    SIGNIN_PATH,
    SIGNUP_PATH,
    USER_ACCOUNT_PATH,
    USER_STATISTICS_PATH
} from './../../../routes';

import styles from './../index.sass';

/**
 * Component with suggestions for authorisation and registration for unauthenticated users and
 * with user options and signout button for authenticated users.
 * 
 * @class HeaderNavigationAuth
 * @extends {Component}
 */
class HeaderNavigationAuth extends Component {
    constructor(props){
        super(props);
        this.signOut = this.props.signOutFunction.bind(this);
    }

    render () {
        const { loggedIn, userName } = this.props;
        if(loggedIn && userName){
            return (
                <div>
                    <Link to={USER_ACCOUNT_PATH} className={styles.link}>{userName}s Account</Link>
                    <Link to={USER_STATISTICS_PATH} className={styles.link}>Quiz statistics</Link>
                    <Button
                        title="Sign out"
                        onClick={this.signOut}
                    />
                </div>
            );
        }
        return (
            <div>
                <NavLink to={SIGNIN_PATH} className={styles.link} activeClassName={styles.link_active}>Sign in</NavLink>
                <NavLink to={SIGNUP_PATH} className={styles.link} activeClassName={styles.link_active}>Create account</NavLink>
            </div>
        );
    }
} 

export default HeaderNavigationAuth;
