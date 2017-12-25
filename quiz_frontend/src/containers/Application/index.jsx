import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {
    signOut,
    setExistingUserData
} from './../../actions/user';
import {
    getQuizCategories,
    getQuizChains,
    getQuizTopics
} from './../../actions/classifiers';

import { closeMessage } from './../../actions/notifications';

import { 
    BackTop,
    notification
} from 'antd';
import HeaderNavigation from './../../components/Navigation/HeaderNavigation';
import Main from './../../components/Main';

import { stringHelper } from './../../helpers';
import {
    getAuthDataFromStorage
} from './../../helpers/localStorageHelpers';

import {
    USER_ACCOUNT_PATH
} from './../../routes';

import './../../../assets/style/index.sass';
import 'antd/dist/antd.css';

const {
    capitalize
} = stringHelper;

class Application extends Component {
    constructor(props){
        super(props);
        this.closeMessage = this.props.closeMessage.bind(this);
    }

    signOut = () => {
        const {
            user: {
                token
            },
            signOut
        } = this.props;

        signOut({token});
    }    

    componentDidMount() {
        const {
            user,
            history,
            setExistingUserData,
            getQuizCategories,
            getQuizChains,
            getQuizTopics
        } = this.props;
        const existingData = getAuthDataFromStorage();
        if (existingData) {
            const authData = JSON.parse(existingData);
            setExistingUserData(authData);
            if (!user.token) {
                history.push(`${USER_ACCOUNT_PATH}`);
            }
        }
        if (user.token || existingData) {
            getQuizCategories();
            getQuizChains();
            getQuizTopics();
        }
    }
    
    componentWillMount () {
        const {
            notifications: {
                notificationTtl
            }
        } = this.props;

        notification.config({
            placement: 'bottomLeft',
            bottom: 50,
            duration: notificationTtl
        });
    }

    componentWillReceiveProps (nextProps) {
        const {
            notifications: {
                isSuccessMessage: nextIsSuccessMessage,
                isErrorMessage: nextIsErrorMessage,
                isInfoMessage: nextIsInfoMessage,
                message: nextMessage,
                title: nextTitle
            },
            user: nextUser
        } = nextProps;

        const {
            notifications: {
                message
            },
            user,
            getQuizCategories,
            getQuizChains,
            getQuizTopics
        } = this.props;

        if (!user.token && nextUser.token) {
            getQuizCategories();
            getQuizChains();
            getQuizTopics();
        }
        
        if (nextIsSuccessMessage && message!==nextMessage) {
            notification['success']({
                message: nextTitle || 'Success!',
                description: capitalize(nextMessage),
                onClose: () => this.closeMessage()
            });
        }
    
        if (nextIsErrorMessage && message!==nextMessage) {
            notification['error']({
                message: nextTitle || 'Error!',
                description: capitalize(nextMessage),
                onClose: () => this.closeMessage()
            });
        }
    
        if (nextIsInfoMessage && message!==nextMessage) {
            notification['info']({
                message: nextTitle || 'Attention!',
                description: capitalize(nextMessage),
                onClose: () => this.closeMessage()
            });
        }
    }
    

    render () {
        const { user } = this.props;
        return (
            <div>
                <BackTop />
                <HeaderNavigation
                    user={user}
                    signOutFunction={() => this.signOut()}
                />
                <Main
                    user={user}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        notifications: state.notifications
    };
}


function mapDispatchToProps(dispatch) {
    return {
        signOut: bindActionCreators(signOut, dispatch),
        closeMessage: bindActionCreators(closeMessage, dispatch),
        setExistingUserData: bindActionCreators(setExistingUserData, dispatch),
        getQuizCategories: bindActionCreators(getQuizCategories, dispatch),
        getQuizChains: bindActionCreators(getQuizChains, dispatch),
        getQuizTopics: bindActionCreators(getQuizTopics, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Application));
