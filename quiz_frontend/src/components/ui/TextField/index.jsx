import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './index.sass';

/**
 * TextField component
 * 
 * @prop {string} type  : type of textfield, can be only 'text' or 'password', default is text
 * @prop {string} label : label of textefield, required
 * @prop {string} value : initial value for textfield, default is ''
 * @prop {boll} error : initial error prop for textfield, required
 * @prop {string} errorMessage : initial errorNessage for textfield, default is ''
 * @prop {object} regex : initial regex prop for textfield, default is regex for anything, checks in isValid method and trgiggers on blur
 * @prop {string} className : initial classname for textfield, default is ''
 * 
 * @class TextField
 * @extends {Component}
 */
class TextField extends Component {
    constructor(props){
        super(props);
        this.state = {
            focused: false,
            invalid: this.props.error,
            value: this.props.value
        };
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);
    }

    onBlur(){
        const isValid = this.isValid();
        this.setState({
            focused: false,
            invalid: !isValid
        });
        if(this.props.onBlur){
            this.props.onBlur();
        }  
    }

    isValid(){
        return this.props.regex.test(this.state.value);
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
        const { type, label, className, errorMessage } = this.props;
        const { value, focused, invalid } =this.state;
        return (
            <div>
                <div className={`  
                    ${styles.wrapper} 
                    ${(focused || value.trim().length > 0 ) ? `${styles.active} ${styles.completed}` : ''}
                    ${(!focused && invalid ) ? `${styles.invalid}` : ''}
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
                    {invalid && 
                        <div
                            className={styles.warning}
                        >
                            {errorMessage}
                        </div>
                    }
                </div>
            </div>
        );
    }
}

TextField.propTypes = {
    type: PropTypes.oneOf(['text', 'password']),
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    error: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    regex: PropTypes.object,
    className: PropTypes.string
};

TextField.defaultProps = {
    type: 'text',
    value: '',
    className: '',
    errorMessage: '',
    regex: /\.*/
};

export default TextField;
