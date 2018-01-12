import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    Route,
    Redirect
} from 'react-router-dom';
import PropTypes from 'prop-types';

import {
    Row,
    Col
} from 'antd';

import moment from 'moment';
import _ from 'lodash';
import validator from 'validator';
import uuid from 'uuid';

import * as userActions from './../../actions/user';
import * as notificationActions from './../../actions/notifications';

import UserAccountMenu from './../../components/User/UserAccountMenu';
import UserProfileAccount from './../../components/User/UserProfile/Account';
import UserProfileSettings from './../../components/User/UserProfile/Settings';
import UserProfileStatstics from './../../components/User/UserProfile/Statistics';
import TestStatisticsPage from './../../components/User/UserProfile/Statistics/TestStatisticsPage';

import {
    USER_ACCOUNT_PATH
} from './../../routes';

import { 
    hocHelpers
} from './../../helpers';

const ACTIONS = {
    ...userActions,
    ...notificationActions
};

const {
    getValuesFromForm,
    getCertainValuesFromForm
} = hocHelpers;

class UserAccountContainer extends Component {
    constructor(props) {
        super(props);
        this.defFormUserProfileValues = {
            first_name: { value: '' },
            last_name: { value: '' },
            username: { value: '' },
            bio: { value: '' }
        };
        this.defFormUserSettingsValues = {
            oldPassword: { value: '' },
            newPassword: { value: '' },
            confirmPassword: { value: '' },
            newEmail: { value: '' }
        };
        this.state = {
            formUserProfileValues: {
                ...this.defFormUserProfileValues
            },
            formUserSettingsValues: {
                ...this.defFormUserSettingsValues
            }
        };
    }

    handleFormChange = (formName) => (changedFields) => {
        this.setState({
            [formName]: { 
                ...this.state[formName], 
                ...changedFields 
            }
        });
    };

    handleAccountSave = () => {
        const { formUserProfileValues } = this.state;
        const { 
            updateUser, 
            user:{
                data: userData,
                data: {
                    user_id: userId
                }
            } 
        } = this.props;

        const data = {
            ...userData,
            ...getValuesFromForm(formUserProfileValues)
        };

        delete data.profile_image;

        updateUser(userId, data);
    };

    handleAccountCancelEditing = () => this.setState((state, props) => ({
        formUserProfileValues: {
            first_name: { value: props.user.data.first_name || '' },
            last_name: { value: props.user.data.last_name || '' },
            username: { value: props.user.data.username || '' },
            bio: { value: props.user.data.bio || '' }
        }
    }));
    
    handlePictureUpload = (pictureFile) => {
        const { formUserProfileValues } = this.state;
        const { 
            updateUser, 
            user:{
                data: userData,
                data: {
                    user_id: userId
                }
            } 
        } = this.props;

        const data = {
            ...userData,
            ...getValuesFromForm(formUserProfileValues)
        };

        const formData = new FormData();

        formData.append('profile_image', pictureFile);
        formData.append('bio', data.bio);
        formData.append('email', data.email);
        formData.append('first_name', data.first_name);
        formData.append('last_name', data.last_name);
        formData.append('user_id', data.user_id);
        formData.append('username', data.username);     

        updateUser(userId, formData);
    };

    handleChangeUserModalState = (modalName, state) => {
        const {
            setUserFormModalsState
        } = this.props;
        setUserFormModalsState(modalName, state);
    };

    handleSettingsUpdate = (changeField) => {
        const { formUserSettingsValues } = this.state;
        const {
            user: {
                data: userData,
                data: {
                    user_id: userId
                }
            },
            updateUserEmail,
            updateUserPassword,
            showErrorMessage
        } = this.props;

        let neededProps = [],
        isValid = true,
        updateFunction = () => {};

        switch (changeField) {
            case 'password':
                neededProps = ['oldPassword', 'newPassword', 'confirmPassword'];
                updateFunction = updateUserPassword;
                break;
            case 'email':
                neededProps = ['newEmail'];
                updateFunction = updateUserEmail;
                break;       
            default:
                break;
        }
        if (neededProps.length > 0) {
            let data = getCertainValuesFromForm(formUserSettingsValues, neededProps);
            if (changeField === 'email') {
                data = {
                    ...userData,
                    email: data.newEmail
                };
                const formData = new FormData();

                formData.append('bio', data.bio);
                formData.append('email', data.email);
                formData.append('first_name', data.first_name);
                formData.append('last_name', data.last_name);
                formData.append('user_id', data.user_id);
                formData.append('username', data.username);     
        
                if (!validator.isEmail(data.email)) {
                    isValid = false;
                    showErrorMessage({
                        message: 'Email should be valid.'
                    });
                }

                data = formData;
            }
            if (changeField === 'password') {
                data = {
                    old_password: data.oldPassword,
                    new_password: data.newPassword,
                    confirm_password: data.confirmPassword
                };
                if (Object.values(data).filter(passwords => passwords.trim().length < 8).length > 0) {
                    isValid = false;
                    showErrorMessage({
                        message: 'Password invalid. It should be 8 or more characters.'
                    });
                }
            }
            if (isValid) {
                updateFunction(userId, data);
            }
        }
    };

    handleSettingsReset = () => this.setState({
        formUserSettingsValues: this.defFormUserSettingsValues
    });

    genereteRowForTable = (type, entity) => {
        const topic = this.props.classifiers.quizTopics.find(topic => topic.id === entity.topic);
        switch (type) {
            case 'test':
                return {
                    key: uuid(),
                    action: entity.id,
                    testName: entity.title,
                    topic: topic ? topic.name : 'Undefined topic',
                    date: moment(entity.passed).format('l')
                };
            default:
                break;
        }
    };

    componentWillMount() {
        const {
            user: {
                data
            }
        } = this.props;

        if (data) {
            this.setState({
                formUserProfileValues: {
                    first_name: { value: data.first_name || '' },
                    last_name: { value: data.last_name || '' },
                    username: { value: data.username || '' },
                    bio: { value: data.bio || '' }
                }
            });
        }        
    }
    

    componentWillReceiveProps(nextProps) {
        const {
            user: {
                data: prevUserData
            }
        } = this.props;

        const {
            user: {
                data: nextUserData
            }
        } = nextProps;

        if (nextUserData && !_.isEqual(nextUserData, prevUserData)) {
            this.setState({
                formUserProfileValues: {
                    first_name: { value: nextUserData.first_name || '' },
                    last_name: { value: nextUserData.last_name || '' },
                    username: { value: nextUserData.username || '' },
                    bio: { value: nextUserData.bio || '' }
                }
            });
        }
    }
    

    render () {
        const {
            user,
            user: {
                data: {
                    profile_image: image
                },
                forms: {
                    profile: {
                        state: profileFormState,
                        modals
                    },
                    statistics: {
                        register: statisticsRegister,
                        statistic
                    }
                },
                loading
            },
            setUserFormViewState,
            setUserFormEditState,
            getUserStatisticsData,
            resetUserQuizResultData,
            getUserQuizResultData
        } = this.props;

        return (
            <Row span="12" style={{ marginTop: '50px'}} >
                <Col span="5">
                    <UserAccountMenu/>                  
                </Col>
                <Col span="16" style={{ padding: '0px 50px' }}>
                    <Route
                        exact
                        path="/user/:component?/:id?"
                        render={(routeProps) => {
                                const component = routeProps.match.params.component || null;
                                const id = routeProps.match.params.id || null;
                                switch (component) {
                                    case 'account':
                                        return (
                                            <UserProfileAccount
                                                image={image ? `${image}` : ''}
                                                formState={profileFormState}
                                                modals={modals}
                                                fields={this.state.formUserProfileValues}

                                                onChange={this.handleFormChange('formUserProfileValues')}
                                                onAccountSave={this.handleAccountSave}
                                                onPictureUpload={this.handlePictureUpload}
                                                setUserFormEditState={setUserFormEditState}
                                                setUserFormViewState={setUserFormViewState}
                                                onChangeModalState={this.handleChangeUserModalState}
                                                onEditCancel={this.handleAccountCancelEditing}
                                            />
                                        );
                                    case 'settings':
                                        return (
                                            <UserProfileSettings
                                                fields={this.state.formUserSettingsValues}

                                                onChange={this.handleFormChange('formUserSettingsValues')}
                                                onPasswordUpdate={() => this.handleSettingsUpdate('password')}
                                                onEmailUpdate={() => this.handleSettingsUpdate('email')}
                                                onFormReset={this.handleSettingsReset}
                                            />
                                        );
                                    case 'statistics':
                                        switch (!!id) {
                                            case true:
                                                return (
                                                    <TestStatisticsPage
                                                        quizId={id}
                                                        statistic={statistic}
                                                        loading={loading}

                                                        getUserQuizResultData={getUserQuizResultData}
                                                        resetUserQuizResultData={resetUserQuizResultData}
                                                    />
                                                );  
                                            default:
                                                return (
                                                    <UserProfileStatstics
                                                        testStatistics={statisticsRegister.sort((a,b) => new Date(b.passed) - new Date(a.passed)).map(test => this.genereteRowForTable('test', test))}

                                                        user={user}
                                                        getUserStatisticsData={getUserStatisticsData}
                                                    />
                                                );  
                                        } 
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
    user: PropTypes.objectOf(PropTypes.any).isRequired,

    showErrorMessage: PropTypes.func.isRequired,
    setUserFormViewState: PropTypes.func.isRequired,
    setUserFormEditState: PropTypes.func.isRequired,
    getUserStatisticsData: PropTypes.func.isRequired,
    resetUserQuizResultData: PropTypes.func.isRequired,
    getUserQuizResultData: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    classifiers: state.classifiers
});
  
export default connect(mapStateToProps, ACTIONS)(UserAccountContainer);


