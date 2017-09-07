import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './index.sass';

class Button extends Component {
    render () {
        const { title, ...rest } = this.props;
        return (
            <div
                className={styles.button}
                {...rest}
            >   
                {title}
            </div>
        );
    }
}

Button.propTypes = {
    title: PropTypes.string
};

Button.defaultProps = {
    title: 'Button'
};

export default Button;
