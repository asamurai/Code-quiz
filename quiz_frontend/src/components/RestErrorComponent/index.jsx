import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
    HOME_PATH
} from './../../routes';

import styles from './index.sass';

/**
 * Component that represent user rest error 
 * 
 * Default error is 404, but it can be 500 or any other, you can specify redirect to any path, code and message of error.
 * 
 * @prop {number} code          : number of error happend, default is 404
 * @prop {string} message       : message of error, deafult is message that you get wrong route 
 * @prop {bool} redirect        : if true enables button for redirect
 * @prop {string} redirectPath  : if redirect true, clicking on button you can redirect to givven path, default is home path
 * 
 * @class RestErrorComponent
 * @extends {Component}
 */
class RestErrorComponent extends Component {
    render () {
        const { code, message, redirect, redirectPath } = this.props;
        return (
            <div
                className={styles.nmc__wrapper}
            >
                <div 
                    className={styles.nmc__content}
                >
                    <h2
                        className={styles.nmc__error_code}
                    >
                        {code}
                    </h2>
                    <div>
                        <div
                            className={styles.nmc__text}
                        >
                            <div>{message}</div>
                            {redirect &&
                                <div>
                                    <div>You feel lost?</div>
                                    <Link to={redirectPath} className={styles.button__back}>Back Home</Link>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

RestErrorComponent.propTypes = {
    code: PropTypes.number,
    message: PropTypes.string,
    redirect: PropTypes.bool,
    redirectPath: PropTypes.string
};  

RestErrorComponent.defaultProps = {
    code: 404,
    message: `Page was not found`,
    redirect: true,
    redirectPath: HOME_PATH
};

export default RestErrorComponent;
