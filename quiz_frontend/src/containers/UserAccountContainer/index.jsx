import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { 
    Route,
    Redirect
} from 'react-router-dom';
import PropTypes from 'prop-types';

import {
    Row,
    Col
} from 'antd';

import { 
    setUserFormEditState,
    setUserFormViewState
} from './../../actions/user';

import UserAccountMenu from './../../components/User/UserAccountMenu';
import UserProfileAccount from './../../components/User/UserProfile/Account';
import UserProfileSettings from './../../components/User/UserProfile/Settings';
import UserProfileStatstics from './../../components/User/UserProfile/Statistics';

import {
    USER_ACCOUNT_PATH
} from './../../routes';

class UserAccountContainer extends Component {

    render () {
        const {
            user: {
                formState
            },
            setUserFormViewState,
            setUserFormEditState
        } = this.props;

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
                                        return (
                                            <UserProfileAccount
                                                image={''}
                                                formState={formState}
                                                setUserFormEditState={setUserFormEditState}
                                                setUserFormViewState={setUserFormViewState}
                                            />
                                        );
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

UserAccountContainer.propTypes = {
    user: PropTypes.objectOf(PropTypes.any).isRequired
};

const mapStateToProps = (state) => ({
    user: state.user
});
  
const mapDispatchToProps = (dispatch) => {
    return {
        setUserFormEditState: bindActionCreators(setUserFormEditState, dispatch),
        setUserFormViewState: bindActionCreators(setUserFormViewState, dispatch)
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(UserAccountContainer);


