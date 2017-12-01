import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
    Row
} from 'antd';

import uuid from 'uuid';

import {
    FULL_QUIZZES_PATH,
    SIGNUP_PATH
} from './../../routes/index';

class HomeContainer extends Component {
    render () {
        const {
            home: {
                coreConcepts
            }
        } = this.props;
        
        return (
            <Row span="12">
                <Row
                    span="12"
                    style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <div
                        style={{
                            margin: '0 auto',
                            marginTop: '30px',
                            fontSize: '18px'
                        }}
                    >
                        <Row span="12">
                            <h2 style={{ textAlign: 'center' }} >{`Why CodeQuizzes?`}</h2>
                        </Row>
                        <Row span="12">
                            <Row span="12" style={{ textAlign: 'center' }}>{`Learning programming is hard... retaining what you learn is even harder!`}</Row>
                            <Row span="12" style={{ textAlign: 'center' }}>{`When you learn a new concept, you need to practice it several times or you'll immediately forget it.`}</Row>
                            <Row span="12" style={{ textAlign: 'center' }}>{`What is the point of reading a book or taking a class if you're going to forget everything anyways?`}</Row>
                        </Row>
                    </div>
                </Row>
                <Row
                    span="12"
                    style={{
                        fontSize: '18px',
                        marginTop: '30px'
                    }}
                >
                    <Row span="12">
                        <h2 style={{ textAlign: 'center' }} >{`Teaching Philosophy`}</h2>
                    </Row>
                    <ul>
                        {
                            coreConcepts.map((concept, index) => (
                                <li key={uuid()}>{index + 1}. {concept}</li>
                            ))
                        }
                    </ul>
                </Row>
                <Row
                    span="12"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        fontSize: '18px',
                        marginTop: '30px'
                    }}
                >
                    <Link to={FULL_QUIZZES_PATH}>
                        Try quiz
                    </Link>
                    <div
                        style={{
                            margin: '0px 30px'
                        }}
                    >
                        {'Or'}
                    </div>
                    <Link to={SIGNUP_PATH}>
                        Sign up
                    </Link>
                </Row>
            </Row>
        );
    }
}

HomeContainer.propTypes = {
    home: PropTypes.objectOf(PropTypes.any).isRequired
};

const mapStateToProps = (state) => ({
    home: state.home
});
  
export default connect(mapStateToProps, {})(HomeContainer);
