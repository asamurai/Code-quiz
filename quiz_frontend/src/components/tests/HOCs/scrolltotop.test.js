import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { ScrollToTopComponent } from './../../HOCs';
import HomeContainer from './../../../containers/HomeContainer';

describe('ScrollToTop HOC test', () => {
    it('ScrollToTop HOC without children', () => {
        const sttc = shallow(
            <ScrollToTopComponent/>
        );
        const tree = toJson(sttc);

        expect(tree).toMatchSnapshot();
    });
    it('ScrollToTop HOC with children', () => {
        const sttc = shallow(
            <ScrollToTopComponent>
                <HomeContainer/>
            </ScrollToTopComponent>
        );
        const tree = toJson(sttc);

        expect(sttc.find(<HomeContainer/>)).toBeTruthy();
        expect(tree).toMatchSnapshot();
    });
});
