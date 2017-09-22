import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './index.sass';

/**
 * Component that will render if you get wrong route
 * 
 * @prop {number} error_code : number of error happend, standart is 404
 * 
 * @class NotMatchedComponent
 * @extends {Component}
 */
class NotMatchedComponent extends Component {
    render () {
        const { error_code } = this.props;
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
                        {error_code}
                    </h2>
                    <div>
                        <div
                            className={styles.nmc__text}
                        >
                            <div>Page {this.props.location.pathname} was not found</div>
                            <div>You feel lost?</div>
                            <Link to={'/'} className={styles.button__back}>Back Home</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

NotMatchedComponent.propTypes = {
    error_code: PropTypes.number
};  

NotMatchedComponent.defaultProps = {
    error_code: 404
};

export default NotMatchedComponent;
