import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Doughnut
} from 'react-chartjs-2';
import moment from 'moment';
import uuid from 'uuid';

import {
    Row,
    Button,
    Collapse,
    Icon
} from 'antd';

const Panel = Collapse.Panel;

class QuizTrainingResults extends Component {

    renderResultAnswers = (answer, choosenAnswers) => {
        const isAnswerCorrect = answer.is_true ? choosenAnswers.includes(answer.id) : !choosenAnswers.includes(answer.id);
        return (
            <Row
                key={uuid()}
                span="12"
                style={{
                    color: isAnswerCorrect ? '#41b715' : '#f22b31'
                }}
            >
                <Icon
                    type={
                        choosenAnswers.includes(answer.id) ? 'check' : 'close'
                    }
                />
                {
                    answer.answer
                }
            </Row>
        );
    }

    renderResultQuestions = question => {
        const chosenAnswers = question.chosen.sort((a, b) => a - b);
        const correctAnswers = question.answers
            .filter(answer => answer.is_true)
            .map(answer => answer.id)
            .sort((a, b) => a - b);

        const isQuestionCorrect = chosenAnswers.length===correctAnswers.length &&
         chosenAnswers.every((answer,i) => answer === correctAnswers[i]);
        
        return (
            <Panel
                key={uuid()}
                header={
                    <Row
                        span="12"
                    >
                        <Icon type={isQuestionCorrect ? 'check' : 'close'}/> {question.text_question}
                    </Row>
                }
            >
                <Row span="12">
                    {
                        'Answers: '
                    }
                </Row>
                <Row span="12">
                    {
                        question.answers.map(answer => this.renderResultAnswers(answer, question.chosen))
                    }
                </Row>
                {
                    !isQuestionCorrect &&
                    <Row span="12">
                        <h3>
                            {'Sources you should learn: '}
                        </h3>
                        <Row span="12">
                            {question.source}
                        </Row>
                    </Row>
                }
            </Panel>
        );
    }

    generateDataSetForDiagram = results => {
        return {
            datasets: [
                {
                    data: [results.correct_chained_answers, results.chained_answers-results.correct_chained_answers],
                    backgroundColor: ['#41b715', '#f22b31']
                }
            ],
            labels: [
                'Correct', 'Incorrect'
            ]
        };
    }

    render () {
        const {
            results,
            exitUncompletedQuizResult
        } = this.props; 

        return (
            <Row span="12">
                <Row
                    span="12"
                    style={{
                        margin: '10px 0px'
                    }}
                >
                    <Button
                        type="primary"
                        icon="close"
                        onClick={() => exitUncompletedQuizResult()}
                    >
                        Back to Quizzes page
                    </Button>
                </Row>
                <Row span="12">
                    <h2>Test: {results.title}</h2>
                    <br/>
                    <br/>
                    <div
                        style={{
                            width: '400px',
                            height: '250px'
                        }}
                    >
                        <Doughnut
                            data={this.generateDataSetForDiagram(results)}
                        />
                    </div>
                    <b>Date of quiz passed:</b> {moment(results.created).format('l')}
                    <br/>
                    <br/>
                    <Collapse>
                        {
                            results.questions.map(this.renderResultQuestions)
                        }
                    </Collapse>
                </Row>
            </Row>
        );
    }
}

QuizTrainingResults.propTypes = {
    results: PropTypes.objectOf(PropTypes.any).isRequired,

    exitUncompletedQuizResult: PropTypes.func.isRequired
};

export default QuizTrainingResults;
