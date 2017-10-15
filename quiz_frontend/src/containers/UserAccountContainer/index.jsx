import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import * as routes from './../../routes';

/**
 * ToDo: user account component with settings;
 * ToDo: user statistics component with his test results;
 */
const Account = () => <div>User Account</div>;
const Settings = () => <div>User Settings</div>;
const Statistics = () => <div>User statistics</div>;

class UserAccountContainer extends Component {
    render () {
        return (
            <Switch>
                <Route exact path={routes.USER_ACCOUNT_PATH} component={Account}/>
                <Route path={routes.USER_SETTINGS_PATH} component={Settings}/>
                <Route path={routes.USER_STATISTICS_PATH} component={Statistics}/>
            </Switch>
        );
    }
}

export default UserAccountContainer;
