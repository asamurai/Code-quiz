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
    render () {
        const {
            form: {
                getFieldDecorator
            },
            onPasswordUpdate,
            onPasswordDataReset,
            onEmailUpdate,
            onEmailDataReset
        } = this.props;
        return (
            <Collapse 
                accordion
                onChange={() => {
                    onEmailDataReset();
                    onPasswordDataReset();
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
                                onClick={onPasswordUpdate}
                            >
                                Save
                            </Button>
                            <Button
                                onClick={onPasswordDataReset}
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
                                onClick={onEmailUpdate}
                            >
                                Save
                            </Button>
                            <Button
                                onClick={onEmailDataReset}
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

Settings.propTypes = {
    onPasswordUpdate: PropTypes.func.isRequired,
    onPasswordDataReset: PropTypes.func.isRequired,
    onEmailUpdate: PropTypes.func.isRequired,
    onEmailDataReset: PropTypes.func.isRequired
};

export default Form.create()(Settings);
