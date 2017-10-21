import React, { Component } from 'react';
import { 
    withRouter
} from 'react-router';
import {
    Link
} from 'react-router-dom';

import {
    Menu,
    Icon
} from 'antd';

import profileRoutes from './../../../routes/userAccountRoutes';

class UserAccountMenu extends Component {
    render () {
        const {
            location: {
                pathname: path
            }
        } = this.props;

        return (
            <Menu
                selectedKeys={[path]}
                mode="inline"
            >
                {
                    profileRoutes.map(profileRoute => (
                        <Menu.Item
                            key={profileRoute.route}
                        >
                            <Link to={profileRoute.route}>
                               <Icon type={profileRoute.icon} />
                                {profileRoute.label}
                            </Link>           
                        </Menu.Item>            
                    ))
                    
                }
            </Menu>
        );
    }
}

export default withRouter(UserAccountMenu);
