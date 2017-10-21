import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { 
    Button,
    Menu,
    Avatar,
    Dropdown,
    Icon
} from 'antd';

import ProfileRoutes from './../../../routes/userAccountRoutes';

import * as routes from './../../../routes';

import styles from './../index.sass';

/**
 * Component with suggestions for authorisation and registration for unauthenticated users and
 * with user options and signout button for authenticated users.
 * 
 * @class HeaderNavigationAuth
 * @extends {Component}
 */
class HeaderNavigationAuth extends Component {
    constructor(props){
        super(props);
        this.signOut = this.props.signOutFunction.bind(this);
    }

    render () {
        const { loggedIn, userName } = this.props;

        const AuthMenu = (
            <Menu>
                {ProfileRoutes.length > 0 &&
                    ProfileRoutes.map((option) => (
                        <Menu.Item key={option.route}>
                            <Link to={option.route} className={styles.link}>
                                <Icon type={option.icon} />
                                {`  ${option.label}`}
                            </Link>
                        </Menu.Item>
                    ))
                }
                {ProfileRoutes.length > 0 && <Menu.Divider />}
                <Menu.Item key="signout">
                    <Button
                        type="danger"
                        icon="logout"
                        onClick={this.signOut}
                    >
                        Sign out
                    </Button>
                </Menu.Item>            
            </Menu>
        );

        if(loggedIn && userName){
            return (
                <Dropdown overlay={AuthMenu} placement="bottomRight">
                    <Avatar style={{ backgroundColor: '#6980b0' }} icon="user" />
                </Dropdown>
            );
        }
        return (
            <div>
                <Link to={routes.SIGNIN_PATH} className={styles.link}>Sign in</Link>
                <Link to={routes.SIGNUP_PATH} className={styles.link}>Create account</Link>
            </div>
        );
    }
} 

export default HeaderNavigationAuth;
