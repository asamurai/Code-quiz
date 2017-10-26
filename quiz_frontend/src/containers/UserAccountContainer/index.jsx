import React, { Component } from 'react';
import { 
    Route,
    Redirect
} from 'react-router-dom';

import {
    Row,
    Col
} from 'antd';

import UserAccountMenu from './../../components/User/UserAccountMenu';
import UserProfileAccount from './../../components/User/UserProfile/Account';
import UserProfileSettings from './../../components/User/UserProfile/Settings';
import UserProfileStatstics from './../../components/User/UserProfile/Statistics';

import {
    USER_ACCOUNT_PATH
} from './../../routes';

class UserAccountContainer extends Component {
    render () {
        return (
            <Row span="12" style={{ marginTop: '50px'}} >
                <Col span="8">
                    <UserAccountMenu/>                  
                </Col>
                <Col span="16" style={{ padding: '0px 50px' }}>
                    <Route
                        exact
                        path="/user/:component"
                        render={(routeProps) => {
                                const component = routeProps.match.params.component || '';
                                switch (component) {
                                    case 'account':
                                        return <UserProfileAccount/>;
                                    case 'settings':
                                        return <UserProfileSettings/>;
                                    case 'statistics':
                                        return <UserProfileStatstics/>;            
                                    default:
                                        return <Redirect to={USER_ACCOUNT_PATH} />;
                                }
                            }
                        }
                    />
                </Col>
            </Row>
        );
    }
}

export default UserAccountContainer;
