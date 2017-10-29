import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
    Table
} from 'antd';

import {
    USER_STATISTICS_PATH
} from './../../../../routes';

class Statistics extends Component {
    constructor(props) {
        super(props);
        this.statisticsColumns = [
            {
                title: '',
                dataIndex: 'testImage',
                key: 'testImage',
                render: (key) => (
                    <div
                        style={{
                            width: '35px',
                            height: '35px',
                            backgroundImage: `url(${key})`,
                            backgroundSize: 'contain',
                            backgroundPosition: 'center center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    />
                )
            },
            {
                title: 'Test',
                dataIndex: 'testName',
                key: 'testName'
            },
            {
                title: 'Score',
                dataIndex: 'testScore',
                key: 'testScore'
            },
            {
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
                render: (key) => new Date(key).toLocaleDateString()
            },      
            {
                title: 'Action',
                dataIndex: 'action',
                key: 'action',
                render: (key) => (
                    <Link to={`${USER_STATISTICS_PATH}/${key}`}>Link</Link>
                )

            }     
        ];
    }
    render () {
        const {
            testStatistics
        } = this.props;
        return (
            <div>
                <h4>User Statistics</h4>
                <Table
                    columns={this.statisticsColumns}
                    dataSource={testStatistics}
                />
            </div>
        );
    }
}

Statistics.propTypes = {
    testStatistics: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default Statistics;
