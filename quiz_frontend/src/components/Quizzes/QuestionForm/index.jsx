import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Row,
    Button,
    Alert
} from 'antd';

import QuestionItem from './../QuestionItem';

class QuestionForm extends Component {

    renderQuestionItem = question => (
        <QuestionItem
            key={question.question_id}
            question={question}
        />
    );

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
                    >
                        Add question
                    </Button>
                </Row>
                <br/>
                {
                    questions.length === 0 &&
                    <Alert
                        message={'There is no questions in level, please add new one.'}
                        type="info"
                    />
                }
                {
                    questions.length > 0 &&
                    questions.map(question => this.renderQuestionItem(question))
                }
            </Row>
        );
    }
}

QuestionForm.propTypes = {
    levelKey: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    questions: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default QuestionForm;
