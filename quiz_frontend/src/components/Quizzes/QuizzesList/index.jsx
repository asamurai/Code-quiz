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
                            onClick={() => {
                                const {
                                    onDeleteQuiz
                                } = this.props;
                                onDeleteQuiz(key.id);
                            }}
                        />
                    </Row>
                )
            },
            {
                key: 'title',
                title: 'title',
                dataIndex: 'title'
            },
            {
                key: 'topic',
                title: 'topic',
                dataIndex: 'topic'
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
        key: el.id,
        action: {
            id: el.id
        },
        title: el.title,
        description: el.description,
        topic: this.props.topics.find(topic => el.topic === topic.id).name,
        created: moment(el.created).format('L'),
        modified: moment(el.modified).format('L') 
    });

    goToCreateForm = () => this.props.history.push(`${QUIZ_CREATE_PATH}`);

    render () {
        const {
            dataSource,
            pages,
            limit,
            onPageChange,
            loading
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
                        loading={loading}
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
    topics: PropTypes.arrayOf(PropTypes.any).isRequired,
    loading: PropTypes.bool.isRequired,

    onPageChange: PropTypes.func.isRequired,
    onDeleteQuiz: PropTypes.func.isRequired
};

export default withRouter(QuizList);
