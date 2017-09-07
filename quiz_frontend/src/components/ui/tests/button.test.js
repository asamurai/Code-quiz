import React from 'react';
import { Button } from '../index.js';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Button component test', () => {
  it('Button title renders correctly without props', () => {
    const button = shallow(
      <Button/>
    );
    const tree = toJson(button);
    expect(tree).toMatchSnapshot();
  }); 
  it('Button title renders correctly with props', () => { 
    const button = shallow(
      <Button
          title="subscribe"
      />
    );
    const tree = toJson(button);
    expect(tree).toMatchSnapshot();
  }); 
});
