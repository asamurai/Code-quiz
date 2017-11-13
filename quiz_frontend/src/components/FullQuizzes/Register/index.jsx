import React, { Component } from 'react';
import {
    Link
} from 'react-router-dom';
import PropTypes from 'prop-types';

import {
    Row,
    Col,
    Card
} from 'antd';

import _ from 'lodash';

import {
    FULL_QUIZZES_PATH
} from './../../../routes';

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
                    _.chunk(register, 4).map((chunk, chunkNum) => {
                        return (
                            <Row key={chunkNum} style={{ display: 'flex' }}>
                                {
                                    chunk.map((quiz, quizNum) => {
                                        return (
                                            <Col key={quizNum} style={{ width: '25%' }}>
                                                <Card>
                                                    <Link to={`${FULL_QUIZZES_PATH}/quiz/${quiz.id}`}>
                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                alignItems: 'center'
                                                            }}
                                                        >
                                                            <div>
                                                                {quiz.title}
                                                            </div>
                                                            <img src={quiz.image} width="50" height="50" alt={quiz.title} />
                                                        </div>
                                                    </Link>
                                                </Card>
                                            </Col>             
                                        );
                                    })
                                }
                            </Row>
                        );
                    })
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
