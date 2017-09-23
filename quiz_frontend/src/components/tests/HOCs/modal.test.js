import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { Modal } from './../../HOCs';
import HomeContainer from './../../../containers/HomeContainer';

const dummy = {
    title: 'Modal'
};

describe('Modal HOC test', () => {
    it('Modal HOC without children', () => {
        const modal = shallow(
            <Modal
                title={dummy.title}
            />
        );
        const tree = toJson(modal);
        expect(modal.contains(<div className="modal__content"/>)).toBeTruthy();
        expect(modal.instance().props.title).toBe(dummy.title);
        expect(tree).toMatchSnapshot();
    });
    it('Modal HOC with children', () => {
        const modal = shallow(
            <Modal
                title={dummy.title}
            >
                <HomeContainer/>
            </Modal>
        );
        const tree = toJson(modal);
        
        expect(modal.instance().props.title).toBe(dummy.title);
        expect(modal.contains(<div className="modal__content"/>)).toBeFalsy();
        expect(modal.find(<HomeContainer/>)).toBeTruthy();
        expect(tree).toMatchSnapshot();
    });
});
