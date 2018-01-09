import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Row,
    Button,
    Table
} from 'antd';

import uuid from 'uuid';
import _ from 'lodash';

class QuestionForm extends Component {

    renderAnswerList = (answer) => (
        <li key={uuid()}>
            {answer.answer}
        </li>
    );

    constructor(props) {
        super(props);

        this.state = {
            levels: [1]
        };

        this.questionListColumns = [
            {
                key: 'action',
                title: 'Action',
                dataIndex: 'action',
                render: (key) => (
                    <Row span="12">
                        <Button
                            type="primary"
                            icon="eye"
                            onClick={() => {
                                const {
                                    questions,
                                    selectQuestion,
                                    setQuestionCreateFormState
                                } = this.props;
                                const selectedQuestion = questions.find(question => question.question_id === key);
                                selectQuestion(selectedQuestion);
                                setQuestionCreateFormState({
                                    view: true
                                });
                                console.log('view question data', key);
                            }}
                        />
                        <Button
                            type="primary"
                            icon="edit"
                            style={{
                                marginRight: '10px',
                                marginLeft: '10px'
                            }}
                            disabled={this.props.state.view}
                            onClick={() => {
                                const {
                                    questions,
                                    selectQuestion,
                                    setQuestionCreateFormState
                                } = this.props;
                                const selectedQuestion = questions.find(question => question.question_id === key);
                                selectQuestion(selectedQuestion);
                                setQuestionCreateFormState({
                                    edit: true
                                });
                                console.log('edit question data', key);
                            }}
                        />
                        <Button
                            type="danger"
                            icon="delete"
                            disabled={this.props.state.view}
                            onClick={() => {
                                console.log('delete question data', key);
                            }}
                        />
                    </Row>
                ),
                width: 150
            },
            {
                key: 'text_question',
                title: 'question',
                dataIndex: 'text_question',
                width: 250
            },
            {
                key: 'level',
                title: 'level',
                dataIndex: 'level'
            },
            {
                key: 'chain',
                title: 'chain',
                dataIndex: 'chain'
            },
            {
                key: 'source',
                title: 'source',
                dataIndex: 'source'
            },
            {
                key: 'correct_answers',
                title: 'Correct answers',
                dataIndex: 'correct_answers',
                render: (answers) => (
                    <ul>
                        {
                            answers.map(this.renderAnswerList)
                        }
                    </ul>
                )
            },
            {
                key: 'incorrect_answers',
                title: 'Incorrect answers',
                dataIndex: 'incorrect_answers',
                render: (answers) => (
                    <ul>
                        {
                            answers.map(this.renderAnswerList)
                        }
                    </ul>
                )
            }
        ];
    }

    generateQuestionsRow = el => ({
        action: el.question_id,
        key: uuid(),
        text_question: el.text_question || '',
        source: el.source || '',
        level: el.level || '',
        chain: this.props.chains.find(chain => chain.id === el.chain).chain_text || '',
        correct_answers: el.answers.filter(answer => answer.is_true),
        incorrect_answers: el.answers.filter(answer => !answer.is_true),
    });

    handleOpenQuestionModal = () => {
        const {
            setQuestionCreateFormState
        } = this.props;
        setQuestionCreateFormState({
            create: true
        });
    };

    componentWillMount () {
        const {
            questions,
            setQuizMaxLevels
        } = this.props;
        const maxLevel = questions && questions.length > 0 ? Math.max(...questions.map(question => question.level)) + 1 : this.state.maxLevel;
        setQuizMaxLevels(maxLevel);
    }

    componentWillReceiveProps(nextProps) {
        const {
            questions,
            maxLevel,
            setQuizMaxLevels
        } = nextProps;
        if (questions && !_.isEqual(this.props.questions, questions)) {
            const newMaxLevel = questions && questions.length > 0 ? Math.max(...questions.map(question => question.level)) : 1;
            setQuizMaxLevels(newMaxLevel);
        }
        if (maxLevel !== this.props.maxLevel) {
            const levels = Array(maxLevel).fill('').map((el, ind) => ind + 1);
            this.setState({
                levels
            });
        }
    }


    render () {
        const {
            questions
        } = this.props;

        return (
            <Row span="12">
                <Row span="12">
                    <Button
                        type="primary"
                        icon="plus"
                        onClick={this.handleOpenQuestionModal}
                    >
                        Add question
                    </Button>
                </Row>
                <br/>
                <Table
                    dataSource={questions.map(this.generateQuestionsRow)}
                    columns={this.questionListColumns}
                />
            </Row>
        );
    }
}

QuestionForm.propTypes = {
    maxLevel: PropTypes.number.isRequired,
    state: PropTypes.objectOf(PropTypes.bool).isRequired,
    questions: PropTypes.arrayOf(PropTypes.any).isRequired,
    chains: PropTypes.arrayOf(PropTypes.any).isRequired,

    selectQuestion: PropTypes.func.isRequired,
    setQuestionCreateFormState: PropTypes.func.isRequired,
    setQuizMaxLevels: PropTypes.func.isRequired
};

export default QuestionForm;