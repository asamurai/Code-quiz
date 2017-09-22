import React, { Component } from 'react';
import PropTypes from 'prop-types';

import HeaderNavigationLinks from './../HeaderNavigationLinks';
import HeaderNavigationAuth from './../HeaderNavigationAuth';

import styles from './../index.sass';

class HeaderNavigation extends Component {
    constructor(props){
        super(props);
        this.signOutFunction = this.props.signOutFunction.bind(this);
    }
    render () {
        const { loggedIn, userName } = this.props;
        return (
            <header className={styles.header_nav}>
                <div className={`${styles.header_wrapper} ${styles.header_wrapper_nav}`}>
                    <HeaderNavigationLinks/>
                    <HeaderNavigationAuth
                        loggedIn={loggedIn}
                        userName={userName}
                        signOutFunction={this.signOutFunction}
                    />
                </div>
            </header>
        );
    }
}

HeaderNavigation.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    userName: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    signOutFunction: PropTypes.func.isRequired
};

HeaderNavigation.defaultProps = {
    userName: null
};

export default HeaderNavigation;
