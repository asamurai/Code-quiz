import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Row,
    Checkbox,
    Alert
} from 'antd';

import uuid from 'uuid';

import QuizTrainingControlPanel from './../../../components/Quizzes/QuizTrainingControlPanel';

class QuizTrainingQuestionList extends Component {

    renderAnswers = (answer, questionId) => {
        const {
            onChangeAnswer
        } = this.props;
        return (
            <Row
                span="12"
                key={uuid()}
            >
                <Checkbox
                    checked={answer.is_true}
                    onChange={() => onChangeAnswer(questionId, answer.id)}
                >
                    {answer.answer}
                </Checkbox>
            </Row>
        );
    };

    renderQuestion = (question, ind) => (
        <Row
            span="12"
            style={{
                margin: '10px'
            }}
            key={uuid()}
        >
            <h2>
                {ind + 1}) {question.text_question}
            </h2>
            <Row
                span="12"
                style={{
                    margin: '10px 15px'
                }}
            >
                {
                    question.answers.map(answer => this.renderAnswers(answer, question.id))
                }
            </Row>
        </Row>
    );

    render () {
        const {
            questions,
            onSendQuizLevel
        } = this.props;

        return (
            <Row span="12">
                <Alert
                    message={
                        <h1>{'Check right answers below: '}</h1>
                    }
                />
                <Row span="12">
                    {
                        questions.map(this.renderQuestion)
                    }
                </Row>
                <QuizTrainingControlPanel
                    onSendQuizLevel={onSendQuizLevel}
                />
            </Row>
        );
    }
}

QuizTrainingQuestionList.propTypes = {
    questions: PropTypes.arrayOf(PropTypes.any).isRequired,

    onChangeAnswer: PropTypes.func.isRequired
};

export default QuizTrainingQuestionList;
