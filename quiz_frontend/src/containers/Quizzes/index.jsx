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
import QuizFormWrapper from './../../components/Quizzes/QuizFormWrapper';
import QuizTraining from './../../components/Quizzes/QuizTraining';

import {
    QUIZ_FULL_PATH ,
    QUIZ_LIST_PATH
} from './../../routes';

const ACTIONS = {
    ...quizzesActions
};

const mockQuestions = [
    {
        question_id: 1,
        question: 'question 1?',
        description: 'description question 1',
        sources: 'question 1 sources',
        answers: [
            {
                answer: 'answer 1',
                isCorrect: true
            },
            {
                answer: 'answer 2',
                isCorrect: false
            },
            {
                answer: 'answer 3',
                isCorrect: false
            }
        ]
    },
    {
        question_id: 2,
        question: 'question 2?',
        description: 'description question 2',
        sources: 'question 2 sources',
        answers: [
            {
                answer: 'answer 1',
                isCorrect: false
            },
            {
                answer: 'answer 2',
                isCorrect: true
            },
            {
                answer: 'answer 3',
                isCorrect: false
            }
        ]
    },
    {
        question_id: 3,
        question: 'question 3?',
        description: 'description question 3',
        sources: 'question 3 sources',
        answers: [
            {
                answer: 'answer 1',
                isCorrect: true
            },
            {
                answer: 'answer 2',
                isCorrect: false
            },
            {
                answer: 'answer 3',
                isCorrect: true
            }
        ]
    },
];

class Quizzes extends Component {

    constructor(props) {
        super(props);

        this.defFormQuizMainInfoValues = {
            description: { value: '' },
            category_id: { value: '' },
            title: { value: '' },
            imageId: { value: '' }
        };

        this.defFormQuestionValues = {
            question: { value: '' },
            level: { value: '' },
            chain: { value: '' },
            description: { value: '' },
            sources: { value: '' },
            answers: []
        };

        this.defState = {
            formQuizMainInfoValues: { ...this.defFormQuizMainInfoValues }
        };

        this.state = { ...this.defState };
    }

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

    handleFormChange = (formName) => (changedFields) => {
        this.setState({
            [formName]: { 
                ...this.state[formName], 
                ...changedFields 
            }
        });
    };

    handleSubmitForm = (formName) => {
        console.log(`submit ${formName}`);
    };

    handleDeleteForm = (formName) => {
        console.log(`delete ${formName}`);
    };

    render () {
        const {
            state,
            register,
            pages,
            classifiers,
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
                                    <QuizFormWrapper
                                        state={state}
                                        mainInfoFormData={{
                                            state: state,
                                            fields: this.state.formQuizMainInfoValues,
                                            formName: 'formQuizMainInfoValues',
                                            onChange: this.handleFormChange('formQuizMainInfoValues'),
                                            quizCategories: classifiers.categoriesList
                                        }}
                                        questionFormData={{
                                            questions: mockQuestions
                                        }}
                                        onChangeState={setQuizCreateFormState}
                                        onSubmit={this.handleSubmitForm}
                                        onDelete={this.handleDeleteForm}
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
    classifiers: PropTypes.objectOf(PropTypes.any).isRequired,

    setQuizCreateFormState: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    state: state.quizzes.formCreation.state,
    register: state.quizzes.quizList.register,
    requestBody: state.quizzes.quizList.requestBody,
    pages: state.quizzes.quizList.pages,
    classifiers: state.classifiers
});
  
export default connect(mapStateToProps, ACTIONS)(Quizzes);
