import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    Route,
    Redirect
} from 'react-router-dom';
import PropTypes from 'prop-types';

import {
    Row
} from 'antd';

import FullQuizzesNavigation from './../../components/FullQuizzes/Navigation';
import FullQuizzesRegister from './../../components/FullQuizzes/Register';
import QuizDetailedInfo from './../../components/FullQuizzes/QuizDetailedInfo';

import * as fullquizzesActions from './../../actions/fullquizzes';

import {
    FULL_QUIZZES_PATH
} from './../../routes/index';

import * as quizzesCategoryNames from './../../constants/quizzesCategoryNames';

const ACTIONS = {
    ...fullquizzesActions
};

class FullQuizzesContainer extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        const {
            fullquizzes: {
                registers
            },
            classifiers: {
                categoriesList
            },
            getTopicsByCategoryId
        } = this.props;

        return (
            <Row span="12">
                <FullQuizzesNavigation />
                <Route
                    path={`${FULL_QUIZZES_PATH}/:category?/:topicId?`}
                    render={(routeProps) => {
                        const category = routeProps.match.params.category || '';
                        const topicId = routeProps.match.params.topicId || null;
                        switch (category) {
                            case 'quiz':
                            switch (!!topicId) {
                                case true:
                                    return (
                                        <QuizDetailedInfo
                                            topicId={topicId}
                                        />
                                    ); 
                                default:
                                return <Redirect to={`${FULL_QUIZZES_PATH}/${quizzesCategoryNames.LANGUAGE}`} />;
                            }
                            case quizzesCategoryNames.LANGUAGE:
                            case quizzesCategoryNames.FRAMEWORK:
                            case quizzesCategoryNames.LIBRARY:
                            case quizzesCategoryNames.TOOL:
                            case quizzesCategoryNames.PLATFORM:  
                                console.log('render');
                                return (
                                    <FullQuizzesRegister
                                        category={category}
                                        registers={registers}
                                        categories={categoriesList}
                                        
                                        getTopicsByCategoryId={getTopicsByCategoryId}
                                    />
                                );               
                            default:    
                                return <Redirect to={`${FULL_QUIZZES_PATH}/${quizzesCategoryNames.LANGUAGE}`} />;
                        }
                    }}
                />
            </Row>
        );
    }
}

FullQuizzesContainer.propTypes = {
    fullquizzes: PropTypes.objectOf(PropTypes.any).isRequired
};

const mapStateToProps = (state) => ({
    fullquizzes: state.fullquizzes,
    classifiers: state.classifiers
});
  
export default connect(mapStateToProps, ACTIONS)(FullQuizzesContainer);


