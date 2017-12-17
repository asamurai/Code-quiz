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

import uuid from 'uuid';

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

class Quizzes extends Component {

    constructor(props) {
        super(props);

        this.defFormQuizMainInfoValues = {
            description: { value: '' },
            category_id: { value: '' },
            title: { value: '' },
            imageId: { value: '' }
        };

        this.defState = {
            formQuizMainInfoValues: { ...this.defFormQuizMainInfoValues },
            levels: [],
            activeLevelKey: null
        };

        this.state = { ...this.defState };
    }

    onChangeActiveLevelKey = (activeLevelKey) => {
        this.setState({ activeLevelKey });
    }

    onEditLevel = (targetKey, action) => {
        // this[action](targetKey);
        switch (action) {
            case 'remove':
                this.onRemoveLevel(targetKey);
                break;
            case 'change':
                this.onChangeActiveLevelKey(targetKey);
                break;
            default:
                break;
        }
    }

    onAddNewLevel = () => {
        const activeLevelKey = uuid();
        this.setState((prevState) => ({
            levels: prevState.levels.concat({ key: activeLevelKey }),
            activeLevelKey
        }));
    };

    onRemoveLevel = (targetKey) => {
        let activeLevelKey = this.state.activeLevelKey;
        let lastIndex;
        this.state.levels.forEach((level, i) => {
            if (level.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const levels = this.state.levels.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeLevelKey === targetKey) {
            activeLevelKey = levels[lastIndex].key;
        }
        this.setState({
            levels,
            activeLevelKey
        });
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
                                        levelOptionsData={{
                                            activeLevelKey: this.state.activeLevelKey,
                                            levels: this.state.levels,
                                            onAddNewLevel: this.onAddNewLevel,
                                            onEditLevel: this.onEditLevel,
                                            onChangeActiveLevelKey: this.onChangeActiveLevelKey
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
