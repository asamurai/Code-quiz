import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, authed, ...rest}) => {
    const isAuthedRender = (props) => {
        if(authed === true){
            return <Component {...props} />;
        }
        return <Redirect to={{pathname: '/signin', state: {from: props.location}}} />;
    };
    return (
        <Route
            {...rest}
            render={isAuthedRender}
        />
    );
};

export default PrivateRoute;
