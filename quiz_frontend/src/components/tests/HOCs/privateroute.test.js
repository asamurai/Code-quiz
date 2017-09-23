import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import HomeContainer from './../../../containers/HomeContainer';
import { PrivateRoute } from './../../HOCs';
/**
 * ToDo: do test routing
 */
describe('PrivateRoute HOC test', () => {
    it('PrivateRoute will redirect to /signin route', () => {
        const pr = shallow(
            <PrivateRoute
                to='/'
                authed={false}
                component={HomeContainer}
            />
        );
        const tree = toJson(pr);

        expect(tree).toMatchSnapshot();
    });
    it('PrivateRoute will pass and render component', () => {
        const pr = shallow(
            <PrivateRoute
                to='/'
                authed
                component={HomeContainer}
            />
        );
        const tree = toJson(pr);

        expect(tree).toMatchSnapshot();
    });
});
