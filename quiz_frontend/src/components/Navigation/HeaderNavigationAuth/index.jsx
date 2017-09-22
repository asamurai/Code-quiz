import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { Button } from './../../ui';

import styles from './../index.sass';

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
                    <Link to='/account' className={styles.link}>{userName}s Account</Link>
                    <Link to='/statistics' className={styles.link}>Quiz statistics</Link>
                    <Button
                        title="Sign out"
                        onClick={this.signOut}
                    />
                </div>
            );
        }
        return (
            <div>
                <NavLink to='/signin' className={styles.link} activeClassName={styles.link_active}>Sign in</NavLink>
                <NavLink to='/signup' className={styles.link} activeClassName={styles.link_active}>Create account</NavLink>
            </div>
        );
    }
} 

export default HeaderNavigationAuth;
