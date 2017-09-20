import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { Image } from './../../ui';

import styles from './index.sass';

class HeaderNavigationLinks extends Component {
    render () {
        return (
            <div className={styles.headerLinksWrapper}>
                <Link to='/'>
                    <Image
                        src="https://cdn0.iconfinder.com/data/icons/seo-smart-pack/128/grey_new_seo3-07-512.png"
                        alt="logo"
                        height={30}
                        width={30}
                    />   
                </Link>
                <NavLink to='/full-quizzes' className={styles.link} activeClassName={styles.activeLink}>Full quizzes</NavLink>
                <NavLink to='/free-quizzes' className={styles.link} activeClassName={styles.activeLink}>Free quizzes</NavLink>
            </div>
        );
    }
}

export default HeaderNavigationLinks;
