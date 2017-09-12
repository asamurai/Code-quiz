import React from 'react';
import { Button } from '../index.js';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Button component test', () => {
  const expectedDefaultProps = {
    title: 'Button',
    className: 'button'
  };
  it('Button title renders correctly without props', () => {
    const button = shallow(
      <Button/>
    );
    const tree = toJson(button);

    expect(button.props().className).toBe(expectedDefaultProps.className);
    expect(button.instance().props.title).toBe(expectedDefaultProps.title);
    expect(button.props().children).toBe(expectedDefaultProps.title);
    expect(tree).toMatchSnapshot();
  }); 
  it('Button title renders correctly with props', () => { 
    const dummyProps = {
      title: 'subscribe'
    }
    const button = shallow(
      <Button
          title={dummyProps.title}
      />
    );
    const tree = toJson(button);

    expect(button.props().className).toBe(expectedDefaultProps.className);
    expect(button.instance().props.title).toBe(dummyProps.title);
    expect(button.props().children).toBe(dummyProps.title);
    expect(tree).toMatchSnapshot();
  }); 
});
