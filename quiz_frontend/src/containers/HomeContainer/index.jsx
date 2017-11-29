import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
    Row
} from 'antd';

import {
    FULL_QUIZZES_PATH,
    SIGNUP_PATH
} from './../../routes/index';

const coreConceptsMock = [
    `The quizzes teach the most important concepts first. We're not going to burden you with a huge quiz that addresses all the edge cases if you're not ready yet!`,
    `Each question is dependent on other questions, questions are "chained" and one question cannot be anwered unless a prior question is answered correctly.`,
    `Each question teaches a single concept. We hate when books teach two concepts at the same time - we only teach one concept per question.`,
    `Repetition, repetition, repetition. The quizzes are meant to be taken multiple times. You need to beat programming concepts in your head to make them stick.`,
    `Bottom up. We start with the basics and work up to more complicated topics. Throwing learners into the deep end leads to frusteration and hoplessness. Learing programming isn't that hard if you take it one step at a time.`,
    `Self sufficient developers. We want to make you a self-sufficient developer that can solve any problem. Too many courses and bootcamps are prematurely training developers complicated frameworks, so they can get a job quickly. We believe in a long term, sequential learning approach.`
];

class HomeContainer extends Component {
    render () {
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
                            coreConceptsMock.map((concept, index) => (
                                <li>{index + 1}. {concept}</li>
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

export default HomeContainer;
