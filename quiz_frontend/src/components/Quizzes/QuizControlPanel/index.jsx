import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import {
    Row,
    Button,
    Modal
} from 'antd';

import {
    QUIZ_LIST_PATH
} from './../../../routes';

const Confirm = Modal.confirm;

class QuizControlPanel extends Component {

    tryToGoQuizList = () => {
        const {
            state
        } = this.props;
        if (state.edit || state.create) {
            Confirm({
                title: `Do you really want to leave quiz ${state.create ? 'creation' : 'editing'} process?`,
                content: `All data you ${state.create ? 'created' : 'edited'} will be unsaved.`,
                onOk: this.goToQuizList
            });
        } else {
            this.goToQuizList();
        }
    }

    onSubmit = () => {
        const {
            formName,
            onSubmit
        } = this.props;

        onSubmit(formName);
    }

    goToQuizList = () => this.props.history.push(QUIZ_LIST_PATH);

    goToEdit = () => {
        const {
            onChangeState
        } = this.props;
        onChangeState({
            edit: true
        });
    }

    render () {
        const {
            state,
            onDelete
        } = this.props;

        if (state.create) {
            return (
                <Row span="12" style={{ padding: '20px 0px' }}>
                   <Button
                        type="primary"
                        icon="rollback"
                        style={{ marginRight: '20px' }}
                        onClick={this.tryToGoQuizList}
                    >
                        Back to Quiz list
                    </Button>
                    <Button
                        type="primary"
                        icon="check"
                        style={{ marginRight: '20px' }}
                        onClick={this.onSubmit}
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
                        onClick={this.tryToGoQuizList}
                    >
                        Back to Quiz list
                    </Button>
                    <Button
                        type="primary"
                        icon="edit"
                        style={{ marginRight: '20px' }}
                        onClick={this.goToEdit}
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
                        onClick={this.tryToGoQuizList}
                    >
                        Back to Quiz list
                    </Button>
                    <Button
                        type="danger"
                        icon="delete"
                        style={{ marginRight: '20px' }}
                        onClick={onDelete}
                    >
                        Delete Quiz
                    </Button>
                    <Button
                        type="primary"
                        icon="save"
                        style={{ marginRight: '20px' }}
                        onClick={this.onSubmit}
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
    state: PropTypes.objectOf(PropTypes.bool).isRequired,

    onSubmit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onChangeState: PropTypes.func.isRequired
};

export default withRouter(QuizControlPanel);
