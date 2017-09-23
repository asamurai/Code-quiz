import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import {
    USER_ACCOUNT_PATH,
    USER_STATISTICS_PATH
} from './../../routes';

/**
 * ToDo: user account component with settings;
 * ToDo: user statistics component with his test results;
 */
const Account = () => <div>User Account</div>;
const Statistics = () => <div>User statistics</div>;

class UserAccountContainer extends Component {
    render () {
        return (
            <Switch>
                <Route exact path={USER_ACCOUNT_PATH} component={Account}/>
                <Route path={USER_STATISTICS_PATH} component={Statistics}/>
            </Switch>
        );
    }
}

export default UserAccountContainer;
