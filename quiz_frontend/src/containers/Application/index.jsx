import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { signOut } from './../../actions/user';
import { closeMessage } from './../../actions/notifications';

import { 
    BackTop,
    notification
} from 'antd';
import HeaderNavigation from './../../components/Navigation/HeaderNavigation';
import Main from './../../components/Main';

import { stringHelper } from './../../helpers';

import './../../../assets/style/index.sass';
import 'antd/dist/antd.css';

const {
    capitalize
} = stringHelper;

/**
 * Application container
 * 
 * Container wrapper by redux connect HOC.
 * 
 * Render and passing props from redux store 
 * into application navigation (HeaderNavigation) and content (Main) components.
 * 
 * Notification init code.
 * 
 * @class Application
 * @extends {Component}
 */
class Application extends Component {
    constructor(props){
        super(props);
        this.signOut = this.props.signOut.bind(this);
        this.closeMessage = this.props.closeMessage.bind(this);
    }

    
    componentWillMount () {
        notification.config({
            placement: 'bottomLeft',
            bottom: 50,
            duration: 3
        });
    }
    

    componentWillReceiveProps (nextProps) {
        const {
            notifications: {
                isSuccessMessage: nextIsSuccessMessage,
                isErrorMessage: nextIsErrorMessage,
                isInfoMessage: nextIsInfoMessage,
                message: nextMessage
            }
        } = nextProps;

        const {
            notifications: {
                message
            }
        } = this.props;
    
        if (nextIsSuccessMessage && message!==nextMessage) {
            notification['success']({
                message: 'Success!',
                description: capitalize(nextMessage),
                onClose: () => this.closeMessage()
            });
        }
    
        if (nextIsErrorMessage && message!==nextMessage) {
            notification['error']({
                message: 'Error!',
                description: capitalize(nextMessage),
                onClose: () => this.closeMessage()
            });
        }
    
        if (nextIsInfoMessage && message!==nextMessage) {
            notification['info']({
                message: 'Attention!',
                description: capitalize(nextMessage),
                onClose: () => this.closeMessage()
            });
        }
    }
    

    render () {
        const { user } = this.props;
        const { data, loggedIn } = user;
        return (
            <div>
                <BackTop />
                <HeaderNavigation
                    loggedIn={loggedIn}
                    userName={data && data.name ? data.name : null}
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
        closeMessage: bindActionCreators(closeMessage, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Application));
