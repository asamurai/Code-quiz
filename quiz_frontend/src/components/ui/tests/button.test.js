import React from 'react';
import { Button, Icon } from '../index.js';
import icons from './../../../utils/icons.json';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Button component test', () => {
  const expectedDefaultProps = {
    title: '',
    className: 'button'
  };
  it('Button title renders correctly without props', () => {
    const button = shallow(
      <Button/>
    );
    const tree = toJson(button);

    expect(button.find('svg').length).toBe(0);
    expect(button.props().className).toBe(expectedDefaultProps.className);
    expect(button.instance().props.title).toBe(expectedDefaultProps.title);
    expect(button.props().children.filter(el=>el!=undefined)[0]).toBe(expectedDefaultProps.title);
    expect(tree).toMatchSnapshot();
  }); 
  it('Button title renders correctly with props', () => { 
    const dummyProps = {
      title: 'subscribe',
      icon: icons.facebook,
      iconRight: true,
      iconLeft: false,
      iconColor: 'blue'
    };
    const button = shallow(
      <Button
          title={dummyProps.title}
          icon={dummyProps.icon}
          iconRight={dummyProps.iconRight}
          iconLeft={dummyProps.iconLeft}
          iconColor={'blue'}
      />
    );
    const tree = toJson(button);
    
    expect(button.find(Icon).props().color).toBe('blue');
    expect(button.find(Icon).length).toBe(1);
    expect(button.instance().props.icon).toBe(dummyProps.icon);
    expect(button.instance().props.iconRight).toBe(dummyProps.iconRight);
    expect(button.instance().props.iconLeft).toBe(dummyProps.iconLeft);
    expect(button.props().className).toBe(expectedDefaultProps.className);
    expect(button.instance().props.title).toBe(dummyProps.title);
    expect(button.props().children.filter(child=>typeof(child)==='string')[0]).toBe(dummyProps.title);
    expect(tree).toMatchSnapshot();
  }); 
});
