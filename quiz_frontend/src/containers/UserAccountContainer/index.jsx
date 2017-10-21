import React, { Component } from 'react';
import { 
    Route,
    Redirect
} from 'react-router-dom';

import {
    Row,
    Col
} from 'antd';

// import UserAccountMenu from './../../components/User/UserAccountMenu';

const Account = () => <div>User Account</div>;
const Settings = () => <div>User Settings</div>;
const Statistics = () => <div>User statistics</div>;

class UserAccountContainer extends Component {
    render () {
        console.log(this.props.match);
        return (
            <Row span="12">
                <Col span="12">
                    {/* <UserAccountMenu
                        url={this.props.match}
                    />                   */}
                </Col>
                <Col span="12">
                    <Route
                        path="/user/:component?"
                        render={(routeProps) => {
                                const component = routeProps.match.params.component || '';
                                console.log(component);
                                switch (component) {
                                    case 'account':
                                        return <Account/>;
                                    case 'settings':
                                        return <Settings/>;
                                    case 'statistics':
                                        return <Statistics/>;            
                                    default:
                                        return <Redirect to="/user/account" />;
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
