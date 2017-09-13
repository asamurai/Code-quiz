import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from './../index.js';

import styles from './index.sass';

class Button extends Component {
    constructor(props){
        super(props);
        this.state = {
            iconLeft: this.props.iconLeft,
            iconRight: this.props.iconRight
        };
    }

    
    componentWillMount (){
        const { iconLeft, iconRight } = this.props;
        switch (true) {
            case (!iconLeft && iconRight):
                this.setState({
                    iconLeft: false,
                    iconRight: true                    
                });
                break;
            case (iconLeft && !iconRight):
                this.setState({
                    iconLeft: true,
                    iconRight: false                    
                });                
                break;
            case (iconLeft && iconRight) || (!iconLeft && !iconRight):
            default:
                this.setState({
                    iconLeft: true,
                    iconRight: false               
                });
                console.warn('Params iconLeft and iconRight should not be the same.');
                break;
        }
    }

    render () {
        const { title, icon, iconColor,...rest } = this.props;
        const { iconLeft, iconRight } = this.state;
        return (
            <div
                className={styles.button}
                icon={icon}
                {...rest}
            >   
                {icon && iconLeft &&
                    <Icon
                        icon={icon}
                        iconColor={iconColor}
                    />
                }
                {title}
                {icon && iconRight &&
                    <Icon
                        icon={icon}
                        color={iconColor}
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
    iconColor: PropTypes.string
};

Button.defaultProps = {
    title: 'Button',
    iconLeft: true,
    iconRight: false,
    iconColor: '#ffffff'
};

export default Button;
