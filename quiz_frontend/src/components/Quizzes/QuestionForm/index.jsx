import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Row,
    Button,
    Table
} from 'antd';

import uuid from 'uuid';

class QuestionForm extends Component {

    renderAnswerList = (answer) => (
        <li key={uuid()}>
            {answer.answer}
        </li>
    );

    constructor(props) {
        super(props);
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
                            onClick={() => {
                                console.log('edit question data', key);
                            }}
                        />
                        <Button                            
                            type="danger"
                            icon="delete"
                            onClick={() => {
                                console.log('delete question data', key);
                            }}
                        />
                    </Row>
                ),
                width: 150
            },
            {
                key: 'question',
                title: 'question',
                dataIndex: 'question',
                width: 250
            },
            {
                key: 'description',
                title: 'description',
                dataIndex: 'description',
                width: 250
            },
            {
                key: 'sources',
                title: 'sources',
                dataIndex: 'sources'
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
        question: el.question || '',
        description: el.description || '',
        sources: el.sources || '',
        correct_answers: el.answers.filter(answer => answer.isCorrect),
        incorrect_answers: el.answers.filter(answer => !answer.isCorrect),
    });

    render () {
        const {
            questions
        } = this.props;

        console.log(questions);

        return (
            <Row span="12">
                <Row span="12">
                    <Button
                        type="primary"
                        icon="plus"
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
    questions: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default QuestionForm;
