import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

import uuid from 'uuid';

import headerNavigationLinks from './../../../routes/headerNavigation.js';

import {
    HOME_PATH
} from './../../../routes';

import styles from './../index.sass';

/**
 * Component with default links that are available for all types of user.
 * 
 * @class HeaderNavigationLinks
 * @extends {Component}
 */
class HeaderNavigationLinks extends Component {
    render () {
        const {
            loggedIn
        } = this.props;

        return (
            <div className={`${styles.header_wrapper} ${styles.header_wrapper_links}`}>
                <Link to={HOME_PATH}>
                    <img
                        src={require('./../../images/logo.png')}
                        alt="logo"
                        height={60}
                        width={60}
                    />   
                </Link>
                {
                    headerNavigationLinks.filter(link => link.auth ? (link.auth && loggedIn) ? true : false: true).map((link) => (
                        <NavLink 
                            key={uuid()}
                            to={link.route}
                            className={styles.link}
                            activeClassName={styles.link_active}
                        >
                            {link.label}
                        </NavLink>
                    ))
                }
            </div>
        );
    }
}

HeaderNavigationLinks.propTypes = {
    loggedIn: PropTypes.bool.isRequired
};

export default HeaderNavigationLinks;
