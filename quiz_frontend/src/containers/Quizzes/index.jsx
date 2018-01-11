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
    getCertainValuesFromForm
} from './../../helpers/hocHelpers';

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
            text_question: { value: '' },
            level: { value: '' },
            chain: { value: '' },
            source: { value: '' },
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
            match: {
                params: {
                    component
                }
            },
            getQuizListByUserId,
            user
        } = this.props;
        console.log(user, component);
        if (user && !component) {
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

        if (!quizData) {
            this.setState(() => ({
                formQuizMainInfoValues: {
                    ...this.defFormQuizMainInfoValues
                }
            }));
        }

        if (!questionData) {
            this.setState(() => ({
                formQuestionValues: {
                    ...this.defFormQuestionValues
                }
            }));
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
                    text_question: { value: questionData.text_question },
                    level: { value: `${questionData.level}` },
                    chain: { value: `${questionData.chain}` },
                    source: { value: questionData.source },
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

    handleUnmountQuizForm = () => {
        const {
            resetQuizzesCreateForm
        } = this.props;

        resetQuizzesCreateForm();
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
                    topic: +formQuizMainInfoValues.topic.value
                };
                createQuiz(data);
            }
            if (formQuiz.state.edit) {
                const quizId = params.id;
                const data = {
                    title: formQuizMainInfoValues.title.value,
                    description: formQuizMainInfoValues.description.value,
                    topic: +formQuizMainInfoValues.topic.value
                };
                updateQuiz(quizId, data);
            }
        }
    };

    handleDeleteForm = () => {
        const {
            deleteQuizByQuizId,
            formQuiz: {
                data: {
                    id: quizId
                }
            },
            history
        } = this.props;

        deleteQuizByQuizId(quizId);
        history.push(`${QUIZ_LIST_PATH}`);
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

    handleCreateQuestion = () => {
        const {
            formQuestionValues
        } = this.state;

        const {
            createQuestion,
            formQuiz
        } = this.props;

        const certainQuestionValues = ['text_question', 'source', 'level', 'chain'];

        const stateQuestionData = getCertainValuesFromForm(formQuestionValues, certainQuestionValues);

        const questionData = {
            ...stateQuestionData,
            chain: +stateQuestionData.chain,
            level: +stateQuestionData.level,
            answers: formQuestionValues.answers.map(answer => {
                if(+answer.id) {
                    return answer;
                }
                return {
                    is_true: answer.is_true,
                    answer: answer.answer
                };
            }),
            quiz: +formQuiz.data.id
        };

        createQuestion(questionData);
    }

    handleEditQuestion = () => {
        const {
            formQuestionValues
        } = this.state;

        const {
            editQuestion,
            formQuiz,
            formQuestion
        } = this.props;

        const certainQuestionValues = ['text_question', 'source', 'level', 'chain'];

        const stateQuestionData = getCertainValuesFromForm(formQuestionValues, certainQuestionValues);

        const questionId = formQuestion.data.id;

        const questionData = {
            ...stateQuestionData,
            chain: +stateQuestionData.chain,
            level: +stateQuestionData.level,
            answers: formQuestionValues.answers.map(answer => {
                if(+answer.id) {
                    return answer;
                }
                return {
                    is_true: answer.is_true,
                    answer: answer.answer
                };
            }),
            quiz: +formQuiz.data.id
        };


        editQuestion(questionId, questionData);
    }

    handleDeleteQuestion = questionId => {
        const {
            deleteQuestion
        } = this.props;

        deleteQuestion(questionId);
    }

    handleGetQuizLevel = quizId => {
        const {
            getQuizQuestionsForPass,
            formTraining: {
                is_finished
            }
        } = this.props;

        getQuizQuestionsForPass(quizId, is_finished);
    }

    handleSendQuizLevel = (quizId, data) => {
        const {
            sendQuizQuestionsForPass
        } = this.props;   
        
        sendQuizQuestionsForPass(quizId, data);
    }

    handleUnmountQuizTraining = () => {
        const {
            resetQuizzesTraining
        } = this.props;

        resetQuizzesTraining();
    }

    render () {

        const {
            formQuestionValues,
            formQuizMainInfoValues
        } = this.state;

        const {
            formQuiz,
            formQuestion,
            formTraining,
            register,
            pages,
            classifiers,
            requestBody: {
                limit
            },
            setQuizCreateFormState,
            setQuestionData,
            setQuestionCreateFormState,
            setQuizMaxLevels,
            loading
        } = this.props;

        return (
            <Row span="12">
                <Route
                    exact
                    path={QUIZ_FULL_PATH}
                    render={(routeProps) => {
                        const component = routeProps.match.params.component || null;
                        const quizId = routeProps.match.params.id || null;
                        switch (component) {
                            case 'list':
                                return (
                                    <QuizzesList
                                        dataSource={register}
                                        topics={classifiers.quizTopics}
                                        pages={pages}
                                        limit={limit}
                                        loading={loading}

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
                                            quizCategories: classifiers.categoriesList,
                                            quizTopics: classifiers.quizTopics,
                                            loading,

                                            onChange: this.handleFormChange('formQuizMainInfoValues')
                                        }}
                                        questionFormData={{
                                            state: formQuiz.state,
                                            maxLevel: formQuiz.maxLevel,
                                            questions: formQuiz.data ? formQuiz.data.questions : [],
                                            chains: classifiers.questionChains,
                                            loading,

                                            setQuizMaxLevels: setQuizMaxLevels,
                                            selectQuestion: setQuestionData,
                                            setQuestionCreateFormState: setQuestionCreateFormState,
                                            onDeleteQuestion: this.handleDeleteQuestion
                                        }}
                                        onChangeState={setQuizCreateFormState}
                                        onSubmit={this.handleSubmitForm}
                                        onDelete={this.handleDeleteForm}
                                        handleUnmountQuizForm={this.handleUnmountQuizForm}
                                    />
                                );
                            case 'training':
                                return (
                                    <QuizTraining
                                        quizId={quizId}
                                        formTraining={formTraining}
                                        loading={loading}

                                        getQuizLevel={this.handleGetQuizLevel}
                                        sendQuizLevel={this.handleSendQuizLevel}
                                        onUnmountQuizTraining={this.handleUnmountQuizTraining}
                                    />
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
                    questions={formQuiz.data ? formQuiz.data.questions : []}
                    formName={'formQuestionValues'}
                    fields={formQuestionValues}
                    loading={loading}

                    onCreate={this.handleCreateQuestion}
                    onEdit={this.handleEditQuestion}
                    
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
    formTraining: PropTypes.objectOf(PropTypes.any).isRequired,
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
    resetQuestionCreateForm: PropTypes.func.isRequired,
    sendQuizQuestionsForPass: PropTypes.func.isRequired,
    getQuizQuestionsForPass: PropTypes.func.isRequired,
    resetQuizzesTraining: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    formQuiz: state.quizzes.formQuizCreation,
    formQuestion: state.quizzes.formQuestionCreation,
    formTraining: state.quizzes.formTraining,
    register: state.quizzes.quizList.register,
    requestBody: state.quizzes.quizList.requestBody,
    pages: state.quizzes.quizList.pages,
    classifiers: state.classifiers,
    user: state.user,
    loading: state.quizzes.loading
});
  
export default connect(mapStateToProps, ACTIONS)(withRouter(Quizzes));
