import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './index.sass';

/**
 * ToDo: Styles and Tests for TextField
 * 
 * TextField component
 * 
 * @prop {string} type  : type of textfield, can be only 'text' or 'password', default is text
 * @prop {string} label : label of textefield, required
 * @prop {string} value : initial value for textfield, default is ''
 * 
 * @class TextField
 * @extends {Component}
 */
class TextField extends Component {
    constructor(props){
        super(props);
        this.state = {
            focused: false,
            value: this.props.value
        };
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);
    }

    onBlur(){
        this.setState({
            focused: false
        });
        if(this.props.onBlur){
            this.props.onBlur();
        }  
    }

    onFocus(){
        this.setState({
            focused: true
        });
        if(this.props.onFocus){
            this.props.onFocus();
        }  
    }

    onChange(element){
        this.setState({
            value: element.target.value
        });
        if(this.props.onChange){
            this.props.onChange(element);
        }   
    }

    render () {
        const { type, label, className } = this.props;
        const { value, focused } =this.state;
        return (
            <div className={`  
                ${styles.wrapper} 
                ${(focused || value.trim().length > 0 ) ? `${styles.active} ${styles.completed}` : ''}
                ${className}
            `}>
                <label 
                    htmlFor={label} 
                    className={styles.label}
                >
                    {label}
                </label>
                <input 
                    id={label} 
                    type={type} 
                    className={styles.input}
                    value={value} 
                    onChange={this.onChange}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                />
            </div>
        );
    }
}

TextField.propTypes = {
    type: PropTypes.oneOf(['text', 'password']),
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    className: PropTypes.string
};

TextField.defaultProps = {
    type: 'text',
    value: '',
    className: ''
};

export default TextField;
