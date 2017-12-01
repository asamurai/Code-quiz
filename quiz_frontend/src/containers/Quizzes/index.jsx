import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { 
    Route,
    Redirect
} from 'react-router-dom';
import {
    Row
} from 'antd';

import * as quizzesActions from './../../actions/quizzes';

import QuizzesList from './../../components/Quizzes/QuizzesList';
import QuizForm from './../../components/Quizzes/QuizForm';
import QuizTraining from './../../components/Quizzes/QuizTraining';

import {
    QUIZ_FULL_PATH ,
    QUIZ_LIST_PATH
} from './../../routes';

const ACTIONS = {
    ...quizzesActions
};

class Quizzes extends Component {

    handleChangeListPage = (page) => {
        const {
            setQuizzesPages,
            pages
        } = this.props;
        setQuizzesPages({
            ...pages,
            currentPage: page
        });
    }

    handleSubmitForm = (formName) => {
        console.log(`submit ${formName}`);
    };

    handleDeleteForm = (formName) => {
        console.log(`delete ${formName}`);
    };

    handleClearForm = (formName) => {
        console.log(`clear ${formName}`);
    };

    render () {
        const {
            state,
            register,
            pages,
            requestBody: {
                limit
            },
            setQuizCreateFormState
        } = this.props;

        return (
            <Row span="12">
                <Route
                    exact
                    path={QUIZ_FULL_PATH}
                    render={(routeProps) => {
                        const component = routeProps.match.params.component || null;
                        switch (component) {
                            case 'list':
                                return (
                                    <QuizzesList
                                        dataSource={register}
                                        pages={pages}
                                        limit={limit}
                                        onPageChange={this.handleChangeListPage}
                                    />
                                );
                            case 'create':
                            case 'view':
                            case 'edit':
                                return (
                                    <QuizForm
                                        state={state}

                                        onChangeState={setQuizCreateFormState}
                                        onSubmit={this.handleSubmitForm}
                                        onDelete={this.handleDeleteForm}
                                        onClear={this.handleClearForm}
                                    />
                                );
                            case 'training':
                                return (
                                    <QuizTraining/>
                                );                   
                            default:
                                return <Redirect to={QUIZ_LIST_PATH} />;
                        }
                    }}
                />
            </Row>
        );
    }
}

Quizzes.propTypes = {
    state: PropTypes.objectOf(PropTypes.bool).isRequired,
    register: PropTypes.arrayOf(PropTypes.any).isRequired,
    requestBody: PropTypes.shape({
        limit: PropTypes.number
    }).isRequired,
    pages: PropTypes.shape({
        currentPage: PropTypes.number,
        totalFinded: PropTypes.number
    }).isRequired,

    setQuizCreateFormState: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    state: state.quizzes.formCreation.state,
    register: state.quizzes.quizList.register,
    requestBody: state.quizzes.quizList.requestBody,
    pages: state.quizzes.quizList.pages
});
  
export default connect(mapStateToProps, ACTIONS)(Quizzes);
