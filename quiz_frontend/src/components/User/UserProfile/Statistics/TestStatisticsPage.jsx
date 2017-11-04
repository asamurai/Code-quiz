import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    Button
} from 'antd';
import {
    Doughnut
} from 'react-chartjs-2';

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

// ToDo: Make action for getting statistic details and put it into reducer statistcs.statistic, after backend final

class TestStatisticsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statistic: null
        };
    }

    componentWillMount () {
        console.log('api get for test details result');
        this.setState({
            statistic: mockStatisticData
        });
    }

    generateDataSetForDiagram = (results) => {
        return {
            datasets: [
                {
                    data: [results.correct, results.incorrect],
                    backgroundColor: ['#41b715', '#f22b31']
                }
            ],
            labels: [
                'Correct', 'Incorrect'
            ]
        };
    }

    goBack = () => {
        this.props.history.goBack();
    };

    render () {
        const {
            testId
        } = this.props;
        const {
            statistic
        } = this.state;

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
                    <b>Test #{testId}</b>
                    <br/>
                    <b>Name:</b> {mockStatisticData.test.name}
                    <br/>
                    <Doughnut
                        data={this.generateDataSetForDiagram(statistic.testResult)}
                    />
                    <b>Score:</b> {mockStatisticData.testResult.score*100}%
                    <br/>
                    <b>Date:</b> {new Date(mockStatisticData.date).toLocaleDateString()}
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
