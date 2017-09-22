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
 * @prop {string} className     : button extents className
 * 
 * @class Button
 * @extends {Component}
 */
class Button extends Component {
    constructor(props){
        super(props);
    }

    render () {
        const { title, icon, iconColor, iconBgColor, iconLeft, iconRight, className, ...rest } = this.props;
        return (
            <div
                className={`${styles.button} ${className}`.trim()}
                icon={icon}
                {...rest}
            >   
                {icon && iconLeft && !iconRight &&
                    <Icon
                        icon={icon}
                        style={{marginRight: title ? '5px' : '0px'}}
                        color={iconColor}
                        bgColor={iconBgColor}
                    />
                }
                {title}
                {icon && !iconLeft && iconRight &&
                    <Icon
                        icon={icon}
                        style={{marginLeft: title ? '5px' : '0px'}}
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
    iconBgColor: PropTypes.string,
    className: PropTypes.string
};

Button.defaultProps = {
    title: '',
    iconLeft: true,
    iconRight: false,
    className: ''
};

export default Button;
