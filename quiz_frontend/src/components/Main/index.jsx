import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from './../HOC/PrivateRoute';
import HomeContainer from './../../containers/HomeContainer';
import AuthContainer from './../../containers/AuthContainer';
import FullQuizzesContainer from './../../containers/FullQuizzesContainer';
import FreeQuizzesContainer from './../../containers/FreeQuizzesContainer';
import UserAccountContainer from './../../containers/UserAccountContainer';
import UserStatisticsContainer from './../../containers/UserStatisticsContainer';
import NotMatchedComponent from './../NotMatchedComponent';

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
                    <Route exact path='/' component={HomeContainer}/>
                    <Route path='/signin' component={AuthContainer}/>
                    <Route path='/signup' component={AuthContainer}/>
                    <Route path='/full-quizzes' component={FullQuizzesContainer}/>
                    <Route path='/free-quizzes' component={FreeQuizzesContainer}/>
                    <PrivateRoute authed={loggedIn} path='/account' component={UserAccountContainer}/>
                    <PrivateRoute authed={loggedIn} path='/statistics' component={UserStatisticsContainer}/>
                    <Route component={NotMatchedComponent}/>
                </Switch>                
            </main>
        );
    }
}

export default Main;
