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
    setUserFormViewState,
    updateUser,
    updateUserPassword,
    updateUserEmail,
    setUserImage,
    setUserFormModalsState
} from './../../actions/user';

import UserAccountMenu from './../../components/User/UserAccountMenu';
import UserProfileAccount from './../../components/User/UserProfile/Account';
import UserProfileSettings from './../../components/User/UserProfile/Settings';
import UserProfileStatstics from './../../components/User/UserProfile/Statistics';

import {
    USER_ACCOUNT_PATH
} from './../../routes';

import { 
    getValuesFromForm,
    getPropsFromForm
} from './../../helpers/hocHelpers';

class UserAccountContainer extends Component {
    constructor(props) {
        super(props);
        this.defFormUserProfileValues = {
            name: { value: '' },
            surname: { value: '' },
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
                data: {
                    id: userId
                }
            } 
        } = this.props;
        const data = getValuesFromForm(formUserProfileValues);
        updateUser(userId, data);
    }

    handlePictureUpload = (pictureFile) => {
        const {
            user: {
                data: {
                    id: userId,
                    imageId
                }
            },
            setUserImage
        } = this.props;
        const formData = new FormData();
        formData.append('file', pictureFile);
        setUserImage(userId, formData, imageId);
    };

    handleChangeUserModalState = (modalName, state) => {
        const {
            setUserFormModalsState
        } = this.props;
        setUserFormModalsState(modalName, state);
    }

    handleSettingsUpdate = (changeField) => {
        const { formUserSettingsValues } = this.state;
        const {
            user: {
                data: {
                    id: userId
                }
            },
            updateUserEmail,
            updateUserPassword
        } = this.props;
        let neededProps = [],
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
            const data = getPropsFromForm(formUserSettingsValues, neededProps);
            updateFunction(userId, data);
        }
    }

    handleSettingsReset = () => this.setState({
        formUserSettingsValues: this.defFormUserSettingsValues
    });

    render () {
        const {
            user: {
                formState,
                modals
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
                                                modals={modals}
                                                fields={this.state.formUserProfileValues}

                                                onChange={this.handleFormChange('formUserProfileValues')}
                                                onAccountSave={this.handleAccountSave}
                                                onPictureUpload={this.handlePictureUpload}
                                                setUserFormEditState={setUserFormEditState}
                                                setUserFormViewState={setUserFormViewState}
                                                onChangeModalState={this.handleChangeUserModalState}
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
        setUserFormViewState: bindActionCreators(setUserFormViewState, dispatch),
        updateUser: bindActionCreators(updateUser, dispatch),
        updateUserPassword: bindActionCreators(updateUserPassword, dispatch),
        updateUserEmail: bindActionCreators(updateUserEmail, dispatch),
        setUserImage: bindActionCreators(setUserImage, dispatch),
        setUserFormModalsState: bindActionCreators(setUserFormModalsState, dispatch)
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(UserAccountContainer);


