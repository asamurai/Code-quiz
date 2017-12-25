import React, { Component } from 'react';
import { 
    withRouter
} from 'react-router';
import PropTypes from 'prop-types';

import _ from 'lodash';

import HeaderNavigationLinks from './../HeaderNavigationLinks';
import HeaderNavigationAuth from './../HeaderNavigationAuth';

import {
    USER_ACCOUNT_PATH
} from './../../../routes';

import styles from './../index.sass';

/**
 * Component renders links depend authentication status of user.(HeaderNavigationAuth component)
 * 
 * Also renders default links that are for all.(HeaderNavigationLinks component)
 * 
 * Pass loggedIn, userName, signOutFunction props into HeaderNavigationAuth component.
 * 
 * @class HeaderNavigation
 * @extends {Component}
 */
class HeaderNavigation extends Component {
    constructor(props){
        super(props);
        this.signOutFunction = this.props.signOutFunction.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const {
            user,
            history
        } = nextProps;

        if (user && user.token && !_.isEqual(user, this.props.user)) {
            history.push(`${USER_ACCOUNT_PATH}`);
        }
    }

    render () {
        const {
            user: {
                loggedIn
            }
        } = this.props;
        return (
            <header className={styles.header_nav}>
                <div className={`${styles.header_wrapper} ${styles.header_wrapper_nav}`}>
                    <HeaderNavigationLinks
                        loggedIn={loggedIn}
                    />
                    <HeaderNavigationAuth
                        loggedIn={loggedIn}
                        signOutFunction={this.signOutFunction}
                    />
                </div>
            </header>
        );
    }
}

HeaderNavigation.propTypes = {
    user: PropTypes.objectOf(PropTypes.any).isRequired,
    history: PropTypes.objectOf(PropTypes.any).isRequired,

    signOutFunction: PropTypes.func.isRequired
};

export default withRouter(HeaderNavigation);
