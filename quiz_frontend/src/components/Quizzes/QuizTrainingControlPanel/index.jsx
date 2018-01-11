import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Row,
    Button
} from 'antd';

class QuizTrainingControlPanel extends Component {
    render () {
        const {
            onSendQuizLevel
        } = this.props;

        return (
            <Row span="12">
                <Button
                    type="danger"
                    icon="close"
                >
                    Exit quiz
                </Button>
                <Button
                    type="primary"
                    icon="check"
                    style={{
                        marginLeft: '20px'
                    }}
                    onClick={() => onSendQuizLevel()}
                >
                    Next
                </Button>
            </Row>
        );
    }
}

QuizTrainingControlPanel.propTypes = {
    onSendQuizLevel: PropTypes.func.isRequired
};

export default QuizTrainingControlPanel;
