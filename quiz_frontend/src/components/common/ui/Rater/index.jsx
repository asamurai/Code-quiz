import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Rate } from 'antd';

class Rater extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        };
    }
    handleChange = (value) => {
        const {
            handleSetValue
        } = this.props;
        this.setState({ value });
        if (handleSetValue) {
            handleSetValue(value);
        }
    }
    render() {
        const { value } = this.state;
        return (<Rate onChange={this.handleChange} value={value} />);
    }
}

Rater.defaultProps = {
    handleSetValue: null,
    value: 0
};

Rater.propTypes = {
    handleSetValue: PropTypes.func,
    value: PropTypes.number
};

export default Rater;
