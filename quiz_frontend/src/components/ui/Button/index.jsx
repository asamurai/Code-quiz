import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from './../index.js';

import styles from './index.sass';

class Button extends Component {
    constructor(props){
        super(props);
    }

    render () {
        const { title, icon, iconColor, iconBgColor, iconLeft, iconRight,...rest } = this.props;
        return (
            <div
                className={styles.button}
                icon={icon}
                {...rest}
            >   
                {icon && iconLeft && !iconRight &&
                    <Icon
                        icon={icon}
                        style={{marginRight: '5px'}}
                        color={iconColor}
                        bgColor={iconBgColor}
                    />
                }
                {title}
                {icon && !iconLeft && iconRight &&
                    <Icon
                        icon={icon}
                        style={{marginLeft: '5px'}}
                        color={iconColor}
                        bgColor={iconBgColor}
                    />
                }
            </div>
        );
    }
}

Button.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string,
    iconLeft: PropTypes.bool,
    iconRight: PropTypes.bool,
    iconColor: PropTypes.string,
    iconBgColor: PropTypes.string
};

Button.defaultProps = {
    title: 'Button',
    iconLeft: true,
    iconRight: false
};

export default Button;
