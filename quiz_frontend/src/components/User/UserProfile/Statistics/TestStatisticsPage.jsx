import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    Row,
    Button,
    Collapse,
    Icon,
    Alert
} from 'antd';

import {
    Doughnut
} from 'react-chartjs-2';
import moment from 'moment';
import uuid from 'uuid';

const Panel = Collapse.Panel;

class TestStatisticsPage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {
            getUserQuizResultData,
            quizId
        } = this.props;

        getUserQuizResultData(quizId);
    }
    
    componentWillUnmount() {
        const {
            resetUserQuizResultData
        } = this.props;

        resetUserQuizResultData();
    }


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

    goBack = () => {
        this.props.history.goBack();
    };

    render () {
        const {
            statistic,
            loading
        } = this.props;

        if (loading) {
            return (
                <Row span="12">
                    <Icon type={'loading'}/>
                    {' Quiz result loading'}
                </Row>
            );
        }
        if (statistic) {
            return (
                <div>
                    <Button
                        type="primary"
                        icon="rollback"
                        onClick={this.goBack}
                        style={{
                            marginBottom: '20px'
                        }}
                    >
                        Back to statistics page
                    </Button>
                    <Row span="12">
                        <h2>Test: {statistic.title}</h2>
                        <br/>
                        <br/>
                        <div
                            style={{
                                width: '400px',
                                height: '250px'
                            }}
                        >
                            <Doughnut
                                data={this.generateDataSetForDiagram(statistic)}
                            />
                        </div>
                        <b>Date of quiz passed:</b> {moment(statistic.created).format('l')}
                        <br/>
                        <br/>
                        <Collapse>
                            {
                                statistic.questions.map(this.renderResultQuestions)
                            }
                        </Collapse>
                    </Row>
                </div>
            );
        }

        return (
            <Alert error message={'Failed to reach result data'}/>
        );
    }
}

TestStatisticsPage.propTypes = {
    quizId: PropTypes.string.isRequired,
    statistic: PropTypes.objectOf(PropTypes.any),
    loading: PropTypes.bool.isRequired,

    getUserQuizResultData: PropTypes.func.isRequired,
    resetUserQuizResultData: PropTypes.func.isRequired
};

export default withRouter(TestStatisticsPage);
