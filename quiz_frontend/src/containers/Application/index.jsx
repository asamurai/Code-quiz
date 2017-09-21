import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { signOut } from './../../actions/user';

import HeaderNavigation from './../../components/Navigation/HeaderNavigation';
import Main from './../Main';

import './../../../assets/style/index.sass';

class Application extends Component {
    constructor(props){
        super(props);
        this.signOut = this.props.signOut.bind(this);
    }

    render () {
        const { user } = this.props;
        const { data, loggedIn } = user;
        return (
            <div>
                <HeaderNavigation
                    loggedIn={loggedIn}
                    userName={data && data.name ? data.name : null}
                    signOutFunction={this.signOut}
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
        user: state.user
    };
}


function mapDispatchToProps(dispatch) {
    return {
        signOut: bindActionCreators(signOut, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Application));
