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

import * as routes from './../../routes';

import './signin.css';

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
            <Form onSubmit={this.handleSubmit} className="login-form">
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
                <FormItem>
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        className="login-form-button"
                        loading={loading}
                    >
                        Sign in
                    </Button>
                    <div>
                        {`Need to create an account? `}
                        <Link to={routes.SIGNUP_PATH}>
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
