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
    SIGNUP_PATH
} from './../../routes';

import styles from './signin.sass';

class SignIn extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e){
        const {
            form: {
                validateFields
            },
            onSignIn
        } = this.props;
        e.preventDefault();
        validateFields((err, values) => {
            if (!err) {
                onSignIn(values);
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
                                message: 'Please input your username.' 
                            }
                        ]
                    })(
                        <Input 
                            type="username"
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
                <FormItem>
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        icon="login"
                        className={styles['login-form-button']}
                        loading={loading}
                    >
                        Sign in
                    </Button>
                    <div>
                        {`Need to create an account? `}
                        <Link to={SIGNUP_PATH}>
                            Sign up
                        </Link>
                    </div>
                </FormItem>
            </Form>
        );
    }
}

SignIn.propTypes = {
    loading: PropTypes.bool.isRequired,
    onSignIn: PropTypes.func.isRequired
};

export default Form.create()(SignIn);
