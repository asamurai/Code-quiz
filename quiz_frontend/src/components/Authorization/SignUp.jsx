import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { 
    Form,
    Icon, 
    Input, 
    Button
} from 'antd';

const FormItem = Form.Item;

import {
    SIGNIN_PATH
} from './../../routes';

import styles from './signin.sass';

class SignUp extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e){
        const {
            form: {
                validateFields
            },
            onSignUp
        } = this.props;
        e.preventDefault();
        validateFields((err, values) => {
            if (!err) {
                onSignUp(values);
            }
        });
    }
    render() {
        const { 
            form:{
                getFieldDecorator
            },
            loading
        } = this.props;

        return (
            <Form onSubmit={this.handleSubmit} className={styles['login-form']}>
                <FormItem
                    label="Username"
                >
                    {getFieldDecorator('username', {
                        rules: [
                            { 
                                required: true, 
                                message: 'Please input your user name.' 
                            }
                        ]
                    })(
                        <Input 
                            prefix={
                                <Icon 
                                    type="user" 
                                    style={{ fontSize: 13 }} 
                                />
                            } 
                            placeholder="Username" 
                        />
                    )}
                </FormItem>
                <FormItem
                    label="Email"
                >
                    {getFieldDecorator('email', {
                        rules: [
                            { 
                                required: true, 
                                message: 'Please input your email.' 
                            }
                        ]
                    })(
                        <Input 
                            type="email"
                            prefix={
                                <Icon 
                                    type="mail" 
                                    style={{ fontSize: 13 }} 
                                />
                            } 
                            placeholder="Email" 
                        />
                    )}
                </FormItem>
                <FormItem
                    label="Password"
                >
                    {getFieldDecorator('password', {
                        rules: [
                            { 
                                required: true, 
                                message: 'Please input your password.' 
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
                            placeholder="Password" 
                        />
                    )}
                </FormItem>
                <FormItem
                    label="Confirm password"
                >
                    {getFieldDecorator('password_confirm', {
                        rules: [
                            { 
                                required: true, 
                                message: 'Please confirm your password.' 
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
                <FormItem>
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        className={styles['login-form-button']}
                        loading={loading}
                    >
                        Sign up
                    </Button>
                    <div>
                        {`Have an account? `}
                        <Link to={SIGNIN_PATH}>
                            Sign in
                        </Link>
                    </div>
                </FormItem>
            </Form>
        );
    }
}

SignUp.propTypes = {
    loading: PropTypes.bool.isRequired,
    onSignUp: PropTypes.func.isRequired
};

export default Form.create()(SignUp);
