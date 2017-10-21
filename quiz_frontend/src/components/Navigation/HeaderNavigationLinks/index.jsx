import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';


import * as routes from './../../../routes';

import styles from './../index.sass';

/**
 * Component with default links that are available for all types of user.
 * 
 * @class HeaderNavigationLinks
 * @extends {Component}
 */
class HeaderNavigationLinks extends Component {
    render () {
        return (
            <div className={`${styles.header_wrapper} ${styles.header_wrapper_links}`}>
                <Link to={routes.HOME_PATH}>
                    <img
                        src={require('./../../images/logo.png')}
                        alt="logo"
                        height={60}
                        width={60}
                    />   
                </Link>
                <NavLink to={routes.FULL_QUIZZES_PATH} className={styles.link} activeClassName={styles.link_active}>Full quizzes</NavLink>
                <NavLink to={routes.FREE_QUIZZES_PATH} className={styles.link} activeClassName={styles.link_active}>Free quizzes</NavLink>
                <NavLink to={routes.FAQ_PATH} className={styles.link} activeClassName={styles.link_active}>FAQ</NavLink>
            </div>
        );
    }
}

export default HeaderNavigationLinks;
