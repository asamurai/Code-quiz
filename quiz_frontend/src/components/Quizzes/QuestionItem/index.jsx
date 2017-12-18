import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Row,
    Collapse,
    Button
} from 'antd';

import QuestionAnswerItem from './../QuestionAnswerItem';

const Panel = Collapse.Panel;

class QuestionItem extends Component {

    renderQuestionAnswer = answer => (
        <QuestionAnswerItem
            key={answer.answer_id}
            answer={answer}
        />
    );



    render () {
        const {
            question: {
                title,
                answers,
                question_id
            }
        } = this.props;

        return (
            <Row span="12">
                <Collapse>
                    <Panel header={title} key={question_id}>
                        <Row span="12">
                            <Row span="12">
                                <Button
                                    type="primary"
                                    icon="edit"
                                    style={{
                                        marginRight: '20px'
                                    }}
                                >
                                    Edit
                                </Button>
                                <Button
                                    type="danger"
                                    icon="delete"
                                >
                                    Delete
                                </Button>
                            </Row>
                            <br/>
                            <Row span="12">
                                <h3>Answers:</h3>
                            </Row>
                            <br/>
                            <Row span="12">
                                {
                                    answers.length > 0 &&
                                    answers.map(answer => this.renderQuestionAnswer(answer))
                                }
                            </Row>
                        </Row>
                    </Panel>
                </Collapse>
            </Row>
        );
    }
}

QuestionItem.propTypes = {
    question: PropTypes.objectOf(PropTypes.any).isRequired
};

export default QuestionItem;
