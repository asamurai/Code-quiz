import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import { PrivateRoute } from './../HOCs';
import HomeContainer from './../../containers/HomeContainer';
import AuthContainer from './../../containers/AuthContainer';
import FullQuizzesContainer from './../../containers/FullQuizzesContainer';
import FreeQuizzesContainer from './../../containers/FreeQuizzesContainer';
import UserAccountContainer from './../../containers/UserAccountContainer';
import RestErrorComponent from './../RestErrorComponent';
import FAQ from './../../containers/FAQ';

import {
    HOME_PATH,
    FULL_QUIZZES_PATH,
    FREE_QUIZZES_PATH,
    SIGNIN_PATH,
    SIGNUP_PATH,
    USER_ACCOUNT_PATH,
    FAQ_PATH
} from './../../routes';

import styles from './index.sass';

/**
 * Component with applications content without navigation,
 * that will rerender each time route changes.
 * 
 * @class Main
 * @extends {Component}
 */
class Main extends Component {
    render () {
        const { loggedIn } = this.props.user;
        return (
            <main className={styles.content_wrapper}>
                <Switch>
                    <Route exact path={HOME_PATH} component={HomeContainer}/>
                    <Route path={SIGNIN_PATH} component={AuthContainer}/>
                    <Route path={SIGNUP_PATH} component={AuthContainer}/>
                    <Route path={FULL_QUIZZES_PATH} component={FullQuizzesContainer}/>
                    <Route path={FREE_QUIZZES_PATH} component={FreeQuizzesContainer}/>
                    <Route path={FAQ_PATH} component={FAQ}/>
                    <PrivateRoute authed={loggedIn} path={USER_ACCOUNT_PATH} component={UserAccountContainer}/>
                    <Route component={RestErrorComponent}/>
                </Switch>                
            </main>
        );
    }
}

export default Main;
