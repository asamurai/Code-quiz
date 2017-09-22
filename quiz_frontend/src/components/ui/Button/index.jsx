import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from './../index.js';

import styles from './index.sass';

/**
 * Button component
 * 
 * @prop {string} title         : button title
 * @prop {string} icon          : button icon,by default at the left part of element. Renders Icon component.
 * @prop {bool} iconLeft        : makes button to be at the left part of element
 * @prop {bool} iconRight       : makes button to be at the right part of element
 * @prop {string} iconColor     : icon color
 * @prop {string} iconBgColor   : icon background color
 * 
 * @class Button
 * @extends {Component}
 */
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
