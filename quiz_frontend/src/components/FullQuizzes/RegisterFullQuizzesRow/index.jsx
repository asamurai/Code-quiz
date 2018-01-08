import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Row
} from 'antd';

import uuid from 'uuid';

import RegisterFullQuizzesElement from './../RegisterFullQuizzesElement';

class RegisterFullQuizzesRow extends Component {
    render () {
        const {
            chunk
        } = this.props;
        
        return (
            <Row key={uuid()} style={{ display: 'flex' }}>
                {
                    chunk.map((quiz) => (
                        <RegisterFullQuizzesElement
                            key={uuid()}
                            quiz={quiz}
                        />
                    ))
                }
            </Row>
        );
    }
}

RegisterFullQuizzesRow.propTypes = {
    chunk: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default RegisterFullQuizzesRow;
