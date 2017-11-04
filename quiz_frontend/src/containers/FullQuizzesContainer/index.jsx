import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { 
    Route,
    Redirect
} from 'react-router-dom';
import PropTypes from 'prop-types';

import {
    Row
} from 'antd';

import {
    setFullQuizzesActiveKey
} from './../../actions/fullquizzes';

import FullQuizzesNavigation from './../../components/FullQuizzes/Navigation';
import FullQuizzesRegister from './../../components/FullQuizzes/Register';
import QuizDetailedInfo from './../../components/FullQuizzes/QuizDetailedInfo';

import {
    FULL_QUIZZES_PATH
} from './../../routes/index';

import * as quizzesCategoryNames from './../../constants/quizzesCategoryNames';

class FullQuizzesContainer extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        const {
            setFullQuizzesActiveKey
        } = this.props;
        return (
            <Row span="12">
                <FullQuizzesNavigation
                    onSetFullQuizzesActiveKey={setFullQuizzesActiveKey}
                />
                <Route
                    exact
                    path={`/${FULL_QUIZZES_PATH}/:quizType?/:quizId?`}
                    render={(routeProps) => {
                        const quizType = routeProps.match.params.quizType || '';
                        const quizId = routeProps.match.params.quizId || null;
                        switch (quizType) {
                            case 'quiz':
                            switch (!!quizId) {
                                case true:
                                    return (
                                        <QuizDetailedInfo
                                            quizId={quizId}
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
                                return (
                                    <FullQuizzesRegister
                                        quizType={quizType}
                                    />
                                );               
                            default:    
                                return <Redirect to={`${FULL_QUIZZES_PATH}/${quizzesCategoryNames.LANGUAGE}`} />;
                        }
                    }}
                />
                <FullQuizzesRegister />
            </Row>
        );
    }
}

FullQuizzesContainer.propTypes = {
    fullquizzes: PropTypes.objectOf(PropTypes.any).isRequired
};

const mapStateToProps = (state) => ({
    fullquizzes: state.fullquizzes
});
  
const mapDispatchToProps = (dispatch) => {
    return {
        setFullQuizzesActiveKey: bindActionCreators(setFullQuizzesActiveKey, dispatch)
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(FullQuizzesContainer);


