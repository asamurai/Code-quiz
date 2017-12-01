import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import {
    Table,
    Row,
    Button
} from 'antd';

import moment from 'moment';

import {
    QUIZ_EDIT_PATH,
    QUIZ_VIEW_PATH,
    QUIZ_CREATE_PATH
} from './../../../routes/index';

class QuizList extends Component {

    constructor(props) {
        super(props);

        this.quizListColumns = [
            {
                key: 'action',
                title: 'Action',
                dataIndex: 'action',
                render: (key) => (
                    <Row span="12">
                        <Button
                            type="primary"
                            icon="eye"
                            onClick={() => {
                                const {
                                    history
                                } = this.props;
                                history.push(`${QUIZ_VIEW_PATH}/${key.id}`);
                            }}
                        />
                        <Button
                            type="primary"
                            icon="edit"
                            style={{
                                marginRight: '10px',
                                marginLeft: '10px'
                            }}
                            onClick={() => {
                                const {
                                    history
                                } = this.props;
                                history.push(`${QUIZ_EDIT_PATH}/${key.id}`);
                            }}
                        />
                        <Button                            
                            type="danger"
                            icon="delete"
                        />
                    </Row>
                )
            },
            {
                key: 'name',
                title: 'name',
                dataIndex: 'name'
            },
            {
                key: 'category',
                title: 'category',
                dataIndex: 'category'
            },
            {
                key: 'description',
                title: 'description',
                dataIndex: 'description',
                width: 500
            },
            {
                key: 'created',
                title: 'created',
                dataIndex: 'created'
            },
            {
                key: 'modified',
                title: 'modified',
                dataIndex: 'modified'
            }
        ];
    }

    generateQuizListRow = (el) => ({
        key: el.testId,
        action: {
            id: el.testId
        },
        name: el.test.name,
        category: el.test.category.name,
        description: el.test.description,
        created: el.test.created ? moment(el.test.created).format('L') : '',
        modified: el.test.modified ? moment(el.test.modified).format('L') : '' 
    });

    goToCreateForm = () => this.props.history.push(`${QUIZ_CREATE_PATH}`);

    render () {
        const {
            dataSource,
            pages,
            limit,
            onPageChange
        } = this.props;

        return (
            <div>
                <Row
                    span="12"
                    style={{
                        margin: '20px 0px'
                    }}
                >
                    <Button
                        type="primary"
                        icon="plus"
                        onClick={this.goToCreateForm}
                    >
                        Create new Quizzes
                    </Button>
                </Row>
                <Row span="12">
                    <Table
                        columns={this.quizListColumns}
                        dataSource={dataSource.map(this.generateQuizListRow)}
                        pagination={{
                            current: pages.currentPage,
                            total: pages.totalFinded,
                            pageSize: limit,
                            onChange: (el) => onPageChange(el)
                        }}
                    />
                </Row>
            </div>
        );
    }
}

QuizList.propTypes = {
    history: PropTypes.objectOf(PropTypes.any).isRequired,
    dataSource: PropTypes.arrayOf(PropTypes.any).isRequired,
    pages: PropTypes.shape({
        currentPage: PropTypes.number,
        totalFinded: PropTypes.number
    }).isRequired,
    limit: PropTypes.number.isRequired,

    onPageChange: PropTypes.func.isRequired
};

export default withRouter(QuizList);
