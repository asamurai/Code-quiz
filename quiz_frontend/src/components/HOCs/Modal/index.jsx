import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from './../../ui';
import icons from './../../../utils/icons.json';

import styles from './index.sass';

/**
 * Modal HOC
 * 
 * @prop {string} title :   Modal title, required
 * @prop {any} children :   Modal content
 * 
 * @class Modal
 * @extends {Component}
 */
class Modal extends Component {
    render () {
        const { title, children } = this.props;
        return (
            <div
                className={styles.modal__wrapper}
            >
                <div
                    className={styles.modal__body}
                >
                    <div
                        className={styles.modal_top__wrapper}
                    >
                        <div
                            className={styles.modal__title}
                        >
                            {title}
                        </div>
                        <Button
                            icon={icons['cancel-circle']}
                            className={`${styles.modal__close} ${styles.modal__button}`}
                        />
                    </div>
                    <div
                        className={styles.modal__content}
                    >
                        {children}
                    </div>
                    <hr/>
                    <div
                        className={styles.modal_bottom__wrapper}
                    >
                        <Button
                            title={'Cancel'}
                            icon={icons['cancel-circle']}
                            className={styles.modal__button}
                        />
                        <Button
                            title={'Сonfirm'}
                            icon={icons.checkmark}
                            className={styles.modal__button}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

Modal.PropTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.any
};

export default Modal;
