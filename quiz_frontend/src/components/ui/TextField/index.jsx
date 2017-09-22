import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
            value: this.props.value
        };
        this.onChange = this.onChange.bind(this);
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
        const { type, label } = this.props;
        const { value } =this.state;
        return (
            <div>
                <label htmlFor={label}>
                    {label}
                </label>
                <input 
                    id={label} 
                    type={type} 
                    value={value} 
                    onChange={this.onChange}
                /> 
            </div>
        );
    }
}

TextField.propTypes = {
    type: PropTypes.oneOf(['text', 'password']),
    label: PropTypes.string.isRequired,
    value: PropTypes.string
};

TextField.defaultProps = {
    type: 'text',
    value: ''
};

export default TextField;
