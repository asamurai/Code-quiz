import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Icon
} from 'antd';

import CategoryQuizList from './../CategoryQuizList';

class QuizDetailedInfo extends Component {

    componentDidMount() {
        const {
            getTopicInfoByTopicId,
            getQuizzesByTopicId,
            topicId
        } = this.props;

        getTopicInfoByTopicId(topicId);
        getQuizzesByTopicId(topicId);
    }
    
    componentWillUnmount() {
        const {
            clearTopicDetailedDataAfterUnmount
        } = this.props;
        clearTopicDetailedDataAfterUnmount();
    }
    
    render () {
        const {
            topic,
            quizzes,
            loading
        } = this.props;

        if (loading) {
            return (
                <div
                    style={{
                        maxWidth: '700px',
                        margin: '0 auto',
                        padding: '30px'
                    }}
                >
                    <Icon
                        type="loading"
                    />
                </div>
            );
        }

        return (
            <div
                style={{
                    maxWidth: '700px',
                    margin: '0 auto',
                    padding: '30px'
                }}
            >
                {
                    topic &&
                    <div>
                        <h3>{topic.name}</h3>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <div
                                style={{
                                    maxWidth: '300px'
                                }}
                            >
                                {topic.description}
                            </div>
                            {/* <div>
                                <img
                                    src={mockTestData.image}
                                />
                            </div> */}
                        </div>
                    </div>
                }
                <CategoryQuizList
                    tests={quizzes}
                />
            </div>
        );
    }
}

QuizDetailedInfo.defaultProps = {
    selectedTopic: null
};

QuizDetailedInfo.propTypes = {
    topicId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    topic: PropTypes.objectOf(PropTypes.any),
    quizzes: PropTypes.arrayOf(PropTypes.any).isRequired,
    loading: PropTypes.bool.isRequired,

    getTopicInfoByTopicId: PropTypes.func.isRequired,
    getQuizzesByTopicId: PropTypes.func.isRequired,
    clearTopicDetailedDataAfterUnmount: PropTypes.func.isRequired
};

export default QuizDetailedInfo;
