import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Button } from './../../ui';

import styles from './index.sass';

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
                <Link to='/signin'>Sign in</Link>
                <Link to='/signup'>Create account</Link>
            </div>
        );
    }
}

export default HeaderNavigationAuth;
