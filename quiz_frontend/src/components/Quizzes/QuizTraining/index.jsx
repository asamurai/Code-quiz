import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import _ from 'lodash';

import {
    Icon
} from 'antd';

import QuizTrainingQuestionsList from './../../../components/Quizzes/QuizTrainingQuestionsList';
import QuizTrainingResults from './../../../components/Quizzes/QuizTrainingResults';

class QuizTraining extends Component {

    constructor(props) {
        super(props);

        this.state = {
            questions: []
        };
    }

    convertQuestions = questions => this.setState({
        questions: questions.map(question => ({
            ...question,
            answers: question.answers.map(answer => ({
                ...answer,
                is_true: false
            }))
        }))
    });

    handleChangeQuestionAnswer = (questionId, answerId) => {
        this.setState((prevState) => ({
            questions: prevState.questions.map(question => {
                if (question.id === questionId) {
                    return {
                        ...question,
                        answers: question.answers.map(answer => {
                            if (answer.id === answerId) {
                                return {
                                    ...answer,
                                    is_true: !answer.is_true
                                };
                            }
                            return answer;
                        })
                    };
                }
                return question;
            })
        }));
    }

    convertQuestionToSendFormat = () => this.state.questions.map(question => ({
        id: question.id,
        answers: question.answers.filter(answer => answer.is_true).map(answer => +answer.id)
    }))

    handleSendQuizLevel = () => {
        const {
            match: {
                params: {
                    id
                }
            },
            sendQuizLevel
        } = this.props;

        const data = this.convertQuestionToSendFormat();

        sendQuizLevel(id, data);
    }
    
    componentWillMount() {
        const {
            formTraining: {
                is_finished,
                data
            }
        } = this.props;
        if (!is_finished) {
            this.convertQuestions(data);
        }
    }

    componentDidMount() {
        const {
            getQuizLevel,
            match: {
                params: {
                    id
                }
            }
        } = this.props;

        if (id) {
            getQuizLevel(id);
        }
    }
    
    componentWillUnmount() {
        const {
            onUnmountQuizTraining
        } = this.props;

        onUnmountQuizTraining();
    }
    
    componentWillReceiveProps(nextProps) {
        const {
            formTraining: {
                is_finished,
                data
            }
        } = nextProps;

        if (!is_finished && !_.isEqual(data, this.props.formTraining.data)) {
            this.convertQuestions(data);
        }
    }

    render () {
        const {
            formTraining: {
                is_finished,
                results
            },
            loading,
            exitUncompletedQuizResult
        } = this.props;

        const {
            questions
        } = this.state;

        if (loading) {
            return (
                <Icon type="loading" />
            );
        }

        if (is_finished && results) {
            return (
                <QuizTrainingResults
                    results={results}

                    exitUncompletedQuizResult={exitUncompletedQuizResult}
                />
            );
        }

        return (
            <QuizTrainingQuestionsList
                questions={questions}
                
                onChangeAnswer={this.handleChangeQuestionAnswer}
                onSendQuizLevel={this.handleSendQuizLevel}
                exitUncompletedQuizResult={exitUncompletedQuizResult}
            />
        );
    }
}

QuizTraining.propTypes = {
    formTraining: PropTypes.objectOf(PropTypes.any).isRequired,
    quizId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    loading: PropTypes.bool.isRequired,

    sendQuizLevel: PropTypes.func.isRequired,
    getQuizLevel: PropTypes.func.isRequired,
    exitUncompletedQuizResult: PropTypes.func.isRequired,
    onUnmountQuizTraining: PropTypes.func.isRequired
};

export default withRouter(QuizTraining);
