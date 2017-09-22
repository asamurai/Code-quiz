import React from 'react';
import { Route, Redirect } from 'react-router-dom';

/**
 * HOC wich renders component if you authenticated or 
 * redirects you to /signin page if you are not.
 * Rest params will be params passed to the route component
 * 
 * Reguired params:
 * @param Component     : React component you want to render if you authenticated
 * @param {bool} authed : value that represent you authenticated or not 
 * 
 * @param {object} {component: Component, authed, ...rest} 
 * @returns 
 */
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
