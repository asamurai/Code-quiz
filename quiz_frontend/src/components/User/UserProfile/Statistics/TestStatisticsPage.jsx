import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    Button
} from 'antd';

const mockStatisticData = {
    id: 1,
    testId: 1,
    test: {
        name: 'Python basics',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHMdsvCwKqIJxU1U-pt6YLZ-iMapbCoWvamcnarpreAa_3xpcd'
    },
    testResult: {
        score: 0.85,
        correct: 85,
        incorrect: 15,
        total: 100
    },
    date: 'Mon Oct 30 2017 00:31:59 GMT+0200 (EET)'
};

class TestStatisticsPage extends Component {
    goBack = () => {
        this.props.history.goBack();
    };

    render () {
        const {
            testId
        } = this.props;
        return (
            <div>
                <Button
                    type="primary"
                    icon="rollback"
                    onClick={this.goBack}
                >
                    Back to statistics page
                </Button>
                <div>
                    Test #{testId}
                    <br/>
                    Name: {mockStatisticData.test.name}
                    <br/>
                    Score: {mockStatisticData.testResult.score*100}%
                    <br/>
                    Date: {new Date(mockStatisticData.date).toLocaleDateString()}
                    <br/>
                </div>
            </div>
        );
    }
}

TestStatisticsPage.propTypes = {
    testId: PropTypes.string.isRequired
};

export default withRouter(TestStatisticsPage);
