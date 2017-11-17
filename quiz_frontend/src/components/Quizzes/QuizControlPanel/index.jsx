import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Row,
    Button
} from 'antd';

class QuizControlPanel extends Component {
    render () {
        const {
            state
        } = this.props;

        if (state.create) {
            return (
                <Row span="12" style={{ padding: '20px 0px' }}>
                   <Button
                        type="primary"
                        icon="rollback"
                        style={{ marginRight: '20px' }}
                    >
                        Back to Quiz list
                    </Button>
                    <Button
                        style={{ marginRight: '20px' }}
                    >
                        Clear form
                    </Button>
                    <Button
                        type="primary"
                        icon="check"
                        style={{ marginRight: '20px' }}
                    >
                        Create Quiz
                    </Button>
                </Row>
            );
        }
        if (state.view) {
            return (
                <Row span="12">
                   <Button
                        type="primary"
                        icon="rollback"
                        style={{ marginRight: '20px' }}
                    >
                        Back to Quiz list
                    </Button>
                    <Button
                        type="danger"
                        icon="delete"
                        style={{ marginRight: '20px' }}
                    >
                        Delete Quiz
                    </Button>
                    <Button
                        type="primary"
                        icon="edit"
                        style={{ marginRight: '20px' }}
                    >
                        Edit Quiz
                    </Button>
                </Row>
            );
        }
        if (state.edit) {
            return (
                <Row span="12">
                   <Button
                        type="primary"
                        icon="rollback"
                        style={{ marginRight: '20px' }}
                    >
                        Back to Quiz list
                    </Button>
                    <Button
                        style={{ marginRight: '20px' }}
                    >
                        Clear form
                    </Button>
                    <Button
                        type="danger"
                        icon="delete"
                        style={{ marginRight: '20px' }}
                    >
                        Delete Quiz
                    </Button>
                    <Button
                        type="primary"
                        icon="save"
                        style={{ marginRight: '20px' }}
                    >
                        Save
                    </Button>
                </Row>
            );
        }
        return null;
    }
}

QuizControlPanel.propTypes = {
    state: PropTypes.objectOf(PropTypes.bool).isRequired
};

export default QuizControlPanel;
