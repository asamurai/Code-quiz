import React from 'react';
import { Link } from 'react-router-dom';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import RestErrorComponent from './../../RestErrorComponent';

import { HOME_PATH } from './../../../routes';

const expectedDefaultProps = {
    code: 404,
    message: 'Page was not found',
    redirect: true,
    redirectPath: HOME_PATH
};
const expectedCustomProps = {
    code: 500,
    message: 'server error',
    redirect: false
};

describe('RestErrorComponent', () => {
    describe('RestErrorComponent with default props', () => {
        const component = shallow(
            <RestErrorComponent/>
        );

        it('Renders with expected props', () => {
            expect(component.instance().props.code).toBe(expectedDefaultProps.code);
            expect(component.instance().props.message).toBe(expectedDefaultProps.message);
            expect(component.instance().props.redirect).toBe(expectedDefaultProps.redirect);
            expect(component.instance().props.redirectPath).toBe(expectedDefaultProps.redirectPath);
        });

        it('Renders redirect link', () => {
            expect(component.find(Link)).toHaveLength(1);
        });

        it('Matching snapshot' , () => {
            const tree = toJson(component); 
            
            expect(tree).toMatchSnapshot();
        });
    });
    describe('RestErrorComponent with custom props', () => {
        const component = shallow(
            <RestErrorComponent
                code = {expectedCustomProps.code}
                message = {expectedCustomProps.message}
                redirect = {expectedCustomProps.redirect}
            />
        );

        it('Renders with expected props', () => {
            expect(component.instance().props.code).toBe(expectedCustomProps.code);
            expect(component.instance().props.message).toBe(expectedCustomProps.message);
            expect(component.instance().props.redirect).toBe(expectedCustomProps.redirect);
            expect(component.instance().props.redirectPath).toBe(expectedDefaultProps.redirectPath);
        });

        it('Don\'t render redirect link', () => {
            expect(component.find(Link)).toHaveLength(0);
        });

        it('Matching snapshot' , () => {
            const tree = toJson(component); 
            
            expect(tree).toMatchSnapshot();
        });
    });
});
