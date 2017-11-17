import React, { Component } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';
import uuid from 'uuid';

import RegisterFullQuizzesRow from './../RegisterFullQuizzesRow';

class FullQuizzesRegister extends Component {
    render () {
        const {
            registers,
            quizType
        } = this.props;
        const register = registers[quizType];
        return (
            <div style={{ background: '#ECECEC', padding: '10px' }}>
                {
                    _.chunk(register, 4).map((chunk) => (
                        <RegisterFullQuizzesRow
                            key={uuid()}
                            chunk={chunk}
                        />
                    ))
                }
            </div>
        );
    }
}

FullQuizzesRegister.propTypes = {
    quizType: PropTypes.string.isRequired,
    registers: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any))).isRequired
};

export default FullQuizzesRegister;
