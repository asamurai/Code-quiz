import React, { Component } from 'react';
import { 
    withRouter
} from 'react-router';
import {
    Link
} from 'react-router-dom';

import {
    Menu
} from 'antd';

import fullQuizzesRoutes from './../../../routes/fullQuizzesRoutes';

class FullQuizzesNavigation extends Component {

    render () {
        const {
            location: {
                pathname: path
            }
        } = this.props;

        return (
            <Menu
                selectedKeys={[path]}
                mode="horizontal"
                style={{
                    display: 'flex'
                }}
            >
                {
                    fullQuizzesRoutes.sort((a,b) => a.key-b.key).map(quiz => (
                        <Menu.Item
                            key={quiz.route}
                            style={{
                                flexGrow: '1',
                                textAlign: 'center',
                                padding: '10px'
                            }}
                        >
                            <Link to={quiz.route}>
                                <b>{quiz.label.toLocaleUpperCase()}</b>
                            </Link>           
                        </Menu.Item>            
                    ))
                    
                }
            </Menu>
        );
    }
}

export default withRouter(FullQuizzesNavigation);
