import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
    Collapse,
    Form,
    Icon,
    Row,
    Button,
    Input
} from 'antd';

import { getPropsObject } from './../../../../helpers/hocHelpers';

const Panel = Collapse.Panel;
const FormItem = Form.Item;

const PANELS = [
    {
        key: 'PASSWORD_CHANGE',
        header: 'Change user password'
    }, 
    {
        key: 'EMAIL_CHANGE',
        header: 'Change user email'
    }
];

class Settings extends Component {

    handleSettingsUpdate = (changeField) => {
        const {
            form: {
                validateFields
            },
            onPasswordUpdate,
            onEmailUpdate
        } = this.props;
        let neededFields = [],
        updateFunction = () => {};
        switch (changeField) {
            case 'password':
                neededFields = ['oldPassword', 'newPassword', 'confirmPassword'];
                updateFunction = onPasswordUpdate;
                break;
            case 'email':
                neededFields = ['newEmail'];
                updateFunction = onEmailUpdate;
                break;       
            default:
                break;
        }
        if (neededFields.length > 0) {
            validateFields(neededFields, (err) => {
                if (!err) {
                    updateFunction();
                }
            });
        }
    }

    render () {
        const {
            form: {
                getFieldDecorator
            },
            onFormReset
        } = this.props;
        return (
            <Collapse 
                accordion
                onChange={() => {
                    onFormReset();
                }}
            >
                <Panel header={PANELS[0].header} key={PANELS[0].key}>
                    <Form>
                        <FormItem
                            label="Old password"
                        >
                            {getFieldDecorator('oldPassword', {
                                rules: [
                                    { 
                                        required: true, 
                                        message: 'Please input your old password.' 
                                    }
                                ]
                            })(
                                <Input
                                    prefix={
                                        <Icon 
                                            type="lock" 
                                            style={{ fontSize: 13 }} 
                                        />
                                    } 
                                    type="password"
                                    placeholder="Old password" 
                                />
                            )}
                        </FormItem>
                        <FormItem
                            label="New password"
                        >
                            {getFieldDecorator('newPassword', {
                                rules: [
                                    { 
                                        required: true, 
                                        message: 'Please input your new password.' 
                                    }
                                ]
                            })(
                                <Input
                                    prefix={
                                        <Icon 
                                            type="lock" 
                                            style={{ fontSize: 13 }} 
                                        />
                                    } 
                                    type="password"
                                    placeholder="New password" 
                                />
                            )}
                        </FormItem>
                        <FormItem
                            label="Confirm password"
                        >
                            {getFieldDecorator('confirmPassword', {
                                rules: [
                                    { 
                                        required: true, 
                                        message: 'Please input your password confirmation.' 
                                    }
                                ]
                            })(
                                <Input
                                    prefix={
                                        <Icon 
                                            type="lock" 
                                            style={{ fontSize: 13 }} 
                                        />
                                    } 
                                    type="password"
                                    placeholder="Confirm password" 
                                />
                            )}
                        </FormItem>
                        <Row span="12">
                            <Button
                                type="primary"
                                style={{
                                    marginRight: '20px'
                                }}
                                onClick={() => this.handleSettingsUpdate('password')}
                            >
                                Save
                            </Button>
                            <Button
                                onClick={onFormReset}
                            >
                                Reset
                            </Button>
                        </Row>
                    </Form>
                </Panel>
                <Panel header={PANELS[1].header} key={PANELS[1].key}>
                    <Form>
                        <FormItem
                            label="New email"
                        >
                            {getFieldDecorator('newEmail', {
                                rules: [
                                    { 
                                        required: true, 
                                        message: 'Please input your new email.' 
                                    }
                                ]
                            })(
                                <Input
                                    prefix={
                                        <Icon 
                                            type="mail" 
                                            style={{ fontSize: 13 }} 
                                        />
                                    } 
                                    type="email"
                                    placeholder="New email" 
                                />
                            )}
                        </FormItem>   
                        <Row span="12">
                            <Button
                                type="primary"
                                style={{
                                    marginRight: '20px'
                                }}
                                onClick={() => this.handleSettingsUpdate('email')}
                            >
                                Save
                            </Button>
                            <Button
                                onClick={onFormReset}
                            >
                                Reset
                            </Button>
                        </Row>                     
                    </Form>
                </Panel>
            </Collapse>
        );
    }
}

const SettingsHOC = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return getPropsObject(props.fields, [
      'oldPassword',
      'newPassword',
      'confirmPassword',
      'newEmail'
    ]);
  }
})(Settings);

Settings.propTypes = {
    onPasswordUpdate: PropTypes.func.isRequired,
    onEmailUpdate: PropTypes.func.isRequired,
    onFormReset: PropTypes.func.isRequired
};

export default SettingsHOC;
