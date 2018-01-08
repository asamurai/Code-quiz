import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { 
    Route,
    Redirect,
    withRouter
} from 'react-router-dom';
import {
    Row
} from 'antd';

import _ from 'lodash';

import * as quizzesActions from './../../actions/quizzes';

import QuizzesList from './../../components/Quizzes/QuizzesList';
import QuizFormWrapper from './../../components/Quizzes/QuizFormWrapper';
import QuizTraining from './../../components/Quizzes/QuizTraining';
import QuizModalForm from './../../components/Quizzes/QuizModalForm';

import {
    QUIZ_FULL_PATH ,
    QUIZ_LIST_PATH,
    QUIZ_CREATE_PATH,
    QUIZ_EDIT_PATH,
    QUIZ_VIEW_PATH
} from './../../routes';

const ACTIONS = {
    ...quizzesActions
};

const mockQuestions = [
    {
        question_id: 1,
        question: 'question 1?',
        description: 'description question 1',
        level: 1,
        chain: 2,
        sources: 'question 1 sources',
        answers: [
            {
                id: 1,
                answer: 'answer 1',
                is_true: true
            },
            {
                id: 2,
                answer: 'answer 2',
                is_true: false
            },
            {
                id: 3,
                answer: 'answer 3',
                is_true: false
            }
        ]
    },
    {
        question_id: 2,
        question: 'question 2?',
        description: 'description question 2',
        level: 1,
        chain: 1,
        sources: 'question 2 sources',
        answers: [
            {
                id: 4,
                answer: 'answer 1',
                is_true: false
            },
            {
                id: 5,
                answer: 'answer 2',
                is_true: true
            },
            {
                id: 6,
                answer: 'answer 3',
                is_true: false
            }
        ]
    },
    {
        question_id: 3,
        question: 'question 3?',
        description: 'description question 3',
        sources: 'question 3 sources',
        level: 2,
        chain: 1,
        answers: [
            {
                id: 7,
                answer: 'answer 1',
                is_true: true
            },
            {
                id: 8,
                answer: 'answer 2',
                is_true: false
            },
            {
                id: 9,
                answer: 'answer 3',
                is_true: true
            }
        ]
    },
    {
        question_id: 4,
        question: 'question 4?',
        description: 'description question 4',
        sources: 'question 4 sources',
        level: 3,
        chain: 1,
        answers: [
            {
                id: 10,
                answer: 'answer 1',
                is_true: true
            },
            {
                id: 11,
                answer: 'answer 2',
                is_true: false
            },
            {
                id: 12,
                answer: 'answer 3',
                is_true: true
            }
        ]
    }
];

class Quizzes extends Component {

    constructor(props) {
        super(props);

        this.defFormQuizMainInfoValues = {
            description: { value: '' },
            category: { value: '' },
            topic: { value: '' },
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
            formQuizMainInfoValues: { ...this.defFormQuizMainInfoValues },
            formQuestionValues: { ...this.defFormQuestionValues }
        };

        this.state = { ...this.defState };
    }

    componentDidMount() {
        const {
            getQuizListByUserId,
            user
        } = this.props;

        if (user) {
            const user_id = user.data.user_id;
            getQuizListByUserId(user_id);
        }
    }

    componentWillReceiveProps(nextProps) {
        const {
            formQuestion: {
                data: questionData,
                state: questionState
            },
            formQuiz: {
                data: quizData,
                state: quizState
            },
            match: {
                params
            },
            history,
            classifiers,
            getQuizByQuizId
        } = nextProps;

        switch (true) {
            case quizState.create && !this.props.formQuiz.state.create:
                history.push(`${QUIZ_CREATE_PATH}`);
                break;
            case quizState.edit && !this.props.formQuiz.state.edit && params.id:
                history.push(`${QUIZ_EDIT_PATH}/${params.id}`);
                break;
            case quizState.view && !this.props.formQuiz.state.view && params.id:
                history.push(`${QUIZ_VIEW_PATH}/${params.id}`);
                break;        
            default:
                break;
        }

        if ((quizState.edit || quizState.view) && quizData && !_.isEqual(quizData, this.props.formQuiz.data)) {
            const categoryId = classifiers.quizTopics.find(topic => topic.id === quizData.topic).category;
            this.setState((prevState) => ({
                formQuizMainInfoValues: {
                    ...prevState.formQuizMainInfoValues,
                    title: { value: quizData.title },
                    description: { value: quizData.description },
                    topic: { value: `${quizData.topic}` },
                    category: { value: `${categoryId}` },
                }
            }));
        }

        if ((questionState.edit || questionState.view) && questionData && !_.isEqual(questionData, this.props.formQuestion.data)) {
            this.setState((prevState) => ({
                formQuestionValues: {
                    ...prevState.formQuestionValues,
                    question: { value: questionData.question },
                    level: { value: `${questionData.level}` },
                    chain: { value: `${questionData.chain}` },
                    description: { value: questionData.description },
                    sources: { value: questionData.sources },
                    answers: questionData.answers
                }
            }));
        }

        if (params.id && this.props.match.params.id !== params.id) {
            const quizId = params.id;
            getQuizByQuizId(quizId);
        }
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

    handleDeleteQuiz = (quizId) => {
        const {
            deleteQuizByQuizId
        } = this.props;
        deleteQuizByQuizId(quizId);
    }

    handleFormChange = (formName) => (changedFields) => {
        switch (true) {
            case changedFields.category && changedFields.category.value !== this.state[formName].category.value:
                this.setState({
                    [formName]: { 
                        ...this.state[formName], 
                        topic: { value: '' },
                        ...changedFields 
                    }
                });             
                break;
            default:
                this.setState({
                    [formName]: { 
                        ...this.state[formName], 
                        ...changedFields 
                    }
                });
                break;
        }
    };

    handleSubmitForm = (formName) => {
        const {
            formQuizMainInfoValues
        } = this.state;
        const {
            formQuiz,
            user,
            createQuiz,
            updateQuiz,
            match: {
                params
            }
        } = this.props;

        if (formName === 'formQuizMainInfoValues') {
            if (formQuiz.state.create) {
                const data = {
                    title: formQuizMainInfoValues.title.value,
                    description: formQuizMainInfoValues.description.value,
                    topic: +formQuizMainInfoValues.topic.value,
                    user: user.data.user_id
                };
                createQuiz(data);
            }
            if (formQuiz.state.edit) {
                const quizId = params.id;
                const data = {
                    title: formQuizMainInfoValues.title.value,
                    description: formQuizMainInfoValues.description.value,
                    topic: +formQuizMainInfoValues.topic.value,
                    user: user.data.user_id
                };
                updateQuiz(quizId, data);
            }
        }
    };

    handleDeleteForm = (formName) => {
        console.log(`delete ${formName}`);
    };

    handleSetNewAnswerList = answers => this.setState((prevState) => ({
        formQuestionValues: {
            ...prevState.formQuestionValues,
            answers
        }
    }));

    handleCloseQuestionModal = () => {
        const {
            setQuestionCreateFormState,
            resetQuestionCreateForm
        } = this.props;
        setQuestionCreateFormState({});
        resetQuestionCreateForm();
        this.setState({
            formQuestionValues: {
                ...this.defFormQuestionValues
            }
        });
    }

    render () {

        const {
            formQuestionValues,
            formQuizMainInfoValues
        } = this.state;

        const {
            formQuiz,
            formQuestion,
            register,
            pages,
            classifiers,
            requestBody: {
                limit
            },
            setQuizCreateFormState,
            setQuestionData,
            setQuestionCreateFormState,
            setQuizMaxLevels
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
                                        topics={classifiers.quizTopics}
                                        pages={pages}
                                        limit={limit}

                                        onDeleteQuiz={this.handleDeleteQuiz}
                                        onPageChange={this.handleChangeListPage}
                                    />
                                );
                            case 'create':
                            case 'view':
                            case 'edit':
                                return (
                                    <QuizFormWrapper
                                        state={formQuiz.state}
                                        maxLevel={formQuiz.maxLevel}
                                        quizFormName={'formQuizMainInfoValues'}
                                        mainInfoFormData={{
                                            state: formQuiz.state,
                                            fields: formQuizMainInfoValues,
                                            formName: 'formQuizMainInfoValues',

                                            onChange: this.handleFormChange('formQuizMainInfoValues'),
                                            quizCategories: classifiers.categoriesList,
                                            quizTopics: classifiers.quizTopics,
                                        }}
                                        questionFormData={{
                                            state: formQuiz.state,
                                            maxLevel: formQuiz.maxLevel,
                                            questions: mockQuestions,

                                            setQuizMaxLevels: setQuizMaxLevels,
                                            selectQuestion: setQuestionData,
                                            setQuestionCreateFormState: setQuestionCreateFormState
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
                <QuizModalForm
                    modalStatus={formQuestion.state}
                    maxLevel={formQuiz.maxLevel}
                    answers={formQuestionValues.answers}
                    questionChains={classifiers.questionChains}
                    questions={mockQuestions}
                    formName={'formQuestionValues'}
                    fields={formQuestionValues}
                    
                    onSetNewAnswerList={this.handleSetNewAnswerList}
                    onChange={this.handleFormChange('formQuestionValues')}
                    closeModal={this.handleCloseQuestionModal}
                />
            </Row>
        );
    }
}

Quizzes.propTypes = {
    formQuiz: PropTypes.objectOf(PropTypes.any).isRequired,
    formQuestion: PropTypes.objectOf(PropTypes.any).isRequired,
    register: PropTypes.arrayOf(PropTypes.any).isRequired,
    requestBody: PropTypes.shape({
        limit: PropTypes.number
    }).isRequired,
    pages: PropTypes.shape({
        currentPage: PropTypes.number,
        totalFinded: PropTypes.number
    }).isRequired,
    classifiers: PropTypes.objectOf(PropTypes.any).isRequired,

    setQuizCreateFormState: PropTypes.func.isRequired,
    setQuestionCreateFormState: PropTypes.func.isRequired,
    setQuestionData: PropTypes.func.isRequired,
    setQuizMaxLevels: PropTypes.func.isRequired,
    resetQuestionCreateForm: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    formQuiz: state.quizzes.formQuizCreation,
    formQuestion: state.quizzes.formQuestionCreation,
    register: state.quizzes.quizList.register,
    requestBody: state.quizzes.quizList.requestBody,
    pages: state.quizzes.quizList.pages,
    classifiers: state.classifiers,
    user: state.user
});
  
export default connect(mapStateToProps, ACTIONS)(withRouter(Quizzes));
