import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import {
    Menu,
    Button
} from 'antd';

import * as routes from './../../../routes';

class componentName extends Component {
    render () {
        return (
            <Menu>
                <Menu.Item key={routes.USER_ACCOUNT_PATH}>
                    <Link to={routes.USER_ACCOUNT_PATH}>
                        Profile
                    </Link>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="signout">
                    <Button
                        type="danger"
                        onClick={this.props.signOut}
                    >
                        Sign out
                    </Button>
                </Menu.Item>            
            </Menu>
        );
    }
}

export default componentName;
