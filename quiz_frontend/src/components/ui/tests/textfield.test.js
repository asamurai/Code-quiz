import React from 'react';
import { TextField } from '../index.js';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('TextField component test', () => {
    it('TextField renders with default props', () => {
        const textfield = shallow(
            <TextField
                type="text"
                label="text"
            />
        );
        const tree = toJson(textfield);
        
        expect(tree).toMatchSnapshot();

    }); 
});
