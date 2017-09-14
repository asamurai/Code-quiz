import React, { Component } from 'react';
import PropTypes from 'prop-types';
/**
 * ToDo: Styles and Tests for TextField
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
        const id = `${new Date().getTime()}_${label}}`;
        return (
            <div>
                <label htmlFor={id}>
                    {label}
                </label>
                <input 
                    id={id} 
                    type={type} 
                    value={value} 
                    onChange={this.onChange}
                /> 
            </div>
        );
    }
}

TextField.propTypes = {
    type: PropTypes.oneOf['text', 'password'],
    label: PropTypes.string.isRequired,
    value: PropTypes.string
};

TextField.defaultProps = {
    type: 'text',
    value: ''
};

export default TextField;
