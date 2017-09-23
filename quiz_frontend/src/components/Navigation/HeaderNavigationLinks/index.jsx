import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { Image } from './../../ui';

import {
    HOME_PATH,
    FULL_QUIZZES_PATH,
    FREE_QUIZZES_PATH
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
        return (
            <div className={`${styles.header_wrapper} ${styles.header_wrapper_links}`}>
                <Link to={HOME_PATH}>
                    <Image
                        src={require('./../../images/logo.png')}
                        alt="logo"
                        height={30}
                        width={30}
                    />   
                </Link>
                <NavLink to={FULL_QUIZZES_PATH} className={styles.link} activeClassName={styles.link_active}>Full quizzes</NavLink>
                <NavLink to={FREE_QUIZZES_PATH} className={styles.link} activeClassName={styles.link_active}>Free quizzes</NavLink>
            </div>
        );
    }
}

export default HeaderNavigationLinks;
