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

import QuizControlPanel from './../../components/Quizzes/QuizControlPanel';
import QuizzesList from './../../components/Quizzes/QuizzesList';
import QuizCreate from './../../components/Quizzes/QuizCreate';
import QuizEdit from './../../components/Quizzes/QuizEdit';
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

    render () {
        const {
            state,
            register,
            pages,
            requestBody: {
                limit
            }
        } = this.props;

        return (
            <Row span="12">
                <QuizControlPanel
                    state={state}
                />
                <Route
                    exact
                    path={QUIZ_FULL_PATH}
                    render={(routeProps) => {
                        const component = routeProps.match.params.component || null;
                        const id = routeProps.match.params.id || null;
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
                                return (
                                    <QuizCreate/>
                                );
                            case 'view':
                            case 'edit':
                                if (id) {
                                    return (
                                        <QuizEdit
                                            id={id}
                                        />
                                    );
                                }
                                break;
                            case 'training':
                                if (id) {
                                    return (
                                        <QuizTraining
                                            id={id}
                                        />
                                    );
                                }
                                break;                     
                            default:
                                return <Redirect to={QUIZ_LIST_PATH} />;
                        }
                        return (
                            <div>Quizzes</div>
                        );
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
};

const mapStateToProps = (state) => ({
    state: state.quizzes.formCreation.state,
    register: state.quizzes.quizList.register,
    requestBody: state.quizzes.quizList.requestBody,
    pages: state.quizzes.quizList.pages
});
  
export default connect(mapStateToProps, ACTIONS)(Quizzes);
