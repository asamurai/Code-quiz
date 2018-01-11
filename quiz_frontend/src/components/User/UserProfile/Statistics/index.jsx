import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Table
} from 'antd';

import moment from 'moment';

class Statistics extends Component {
    constructor(props) {
        super(props);
        this.statisticsColumns = [
            {
                title: 'Quiz',
                dataIndex: 'testName',
                key: 'testName'
            },
            {
                title: 'Topic',
                dataIndex: 'topic',
                key: 'topic'
            },
            {
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
                render: (key) => moment(key).format('l')
            }   
            // {
            //     title: 'Action',
            //     dataIndex: 'action',
            //     key: 'action',
            //     render: (key) => (
            //         <Link to={`${USER_STATISTICS_PATH}/${key}`}>Link</Link>
            //     )

            // }     
        ];
    }

    componentDidMount () {
        const {
            getUserStatisticsData,
            user: {
                data: {
                    user_id: userId
                }
            }
        } = this.props;

        getUserStatisticsData(userId);
    }
    

    render () {
        const {
            testStatistics,
            user: {
                loading
            }
        } = this.props;
        
        return (
            <div>
                <h3>User Statistics</h3>
                <hr/>
                <Table
                    columns={this.statisticsColumns}
                    dataSource={testStatistics}

                    loading={loading}
                />
            </div>
        );
    }
}

Statistics.propTypes = {
    testStatistics: PropTypes.arrayOf(PropTypes.any).isRequired,
    user: PropTypes.objectOf(PropTypes.any).isRequired,

    getUserStatisticsData: PropTypes.func.isRequired
};

export default Statistics;
