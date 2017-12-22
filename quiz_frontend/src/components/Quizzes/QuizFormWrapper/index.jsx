import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import {
    Tabs
} from 'antd';

import QuizControlPanel from './../QuizControlPanel';
import QuestionForm from './../QuestionForm';
import QuizFormInfo from './../QuizFormInfo';

import {
    QUIZ_CREATE_PATH,
    QUIZ_EDIT_PATH,
    QUIZ_VIEW_PATH
} from './../../../routes';

const TabPane = Tabs.TabPane;

class QuizFormWrapper extends Component {    
    componentWillMount() {
        const {
            location: {
                pathname
            },
            onChangeState
        } = this.props;

        switch (true) {
            case pathname.includes(QUIZ_CREATE_PATH):
                onChangeState({
                    create: true
                });
                break;
            case pathname.includes(QUIZ_EDIT_PATH):
                onChangeState({
                    edit: true
                });
                break;
            case pathname.includes(QUIZ_VIEW_PATH):
                onChangeState({
                    view: true
                });           
                break;
            default:
                break;
        }
    }

    componentWillReceiveProps (nextProps) {
        const {
            location: {
                pathname: prevPathname
            }
        } = this.props;

        const {
            location: {
                pathname: nextPathname
            },
            onChangeState
        } = nextProps;

        switch (true) {
            case !prevPathname.includes(QUIZ_CREATE_PATH) && nextPathname.includes(QUIZ_CREATE_PATH):
                onChangeState({
                    create: true
                });
                break;
            case !prevPathname.includes(QUIZ_EDIT_PATH) && nextPathname.includes(QUIZ_EDIT_PATH):
                onChangeState({
                    edit: true
                });
                break;
            case !prevPathname.includes(QUIZ_VIEW_PATH) && nextPathname.includes(QUIZ_VIEW_PATH):
                onChangeState({
                    view: true
                });           
                break;
            default:
                break;
        }
    }
    

    render () {
        const {
            state,
            onSubmit,
            onDelete,
            mainInfoFormData,
            questionFormData
        } = this.props;

        return (
            <div>
                <QuizControlPanel
                    state={state}

                    onSubmit={onSubmit}
                    onDelete={onDelete}
                />
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Main info" key="1">
                        <QuizFormInfo
                            {...mainInfoFormData}
                        />
                    </TabPane>
                    <TabPane tab={`Questions`} key="2">
                        <QuestionForm
                            {...questionFormData}
                        />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

QuizFormWrapper.propTypes = {
    match: PropTypes.objectOf(PropTypes.any).isRequired,
    location: PropTypes.objectOf(PropTypes.any).isRequired,
    state: PropTypes.objectOf(PropTypes.bool).isRequired,
    mainInfoFormData: PropTypes.objectOf(PropTypes.any).isRequired,
    questionFormData: PropTypes.objectOf(PropTypes.any).isRequired,

    onChangeState: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default withRouter(QuizFormWrapper);
