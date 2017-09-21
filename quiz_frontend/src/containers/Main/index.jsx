import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from './../../components/PrivateRoute';
import HomeContainer from './../HomeContainer';
import AuthContainer from './../AuthContainer';
import FullQuizzesContainer from './../FullQuizzesContainer';
import FreeQuizzesContainer from './../FreeQuizzesContainer';
import UserAccountContainer from './../UserAccountContainer';
import UserStatisticsContainer from './../UserStatisticsContainer';

class Main extends Component {
    render () {
        const { loggedIn } = this.props.user;
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={HomeContainer}/>
                    <Route path='/signin' component={AuthContainer}/>
                    <Route path='/signup' component={AuthContainer}/>
                    <Route path='/full-quizzes' component={FullQuizzesContainer}/>
                    <Route path='/free-quizzes' component={FreeQuizzesContainer}/>
                    <PrivateRoute authed={loggedIn} path='/account' component={UserAccountContainer}/>
                    <PrivateRoute authed={loggedIn} path='/statistics' component={UserStatisticsContainer}/>
                </Switch>                
            </main>
        );
    }
}

export default Main;
