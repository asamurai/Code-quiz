import React from 'react';
import { Icon } from '../index.js';
import icons from './../../../utils/icons.json';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Button component test', () => {
    it('Icon renders with default props', () => {
        const icon = shallow(
            <Icon
                icon={icons.facebook}
            />
        );
        const defaultStyles = {
            backgroundColor: 'rgba(0,0,0,0)',
            display: 'inline-block',
            verticalAlign: 'middle',
        };
        const tree = toJson(icon);
        
        expect(icon.instance().props.icon).toBe(icons.facebook);
        expect(icon.props().style).toEqual(defaultStyles);
        expect(icon.props().width).toBe('20px');
        expect(icon.props().height===icon.props().width).toBeTruthy();
        expect(icon.props().viewBox).toBe('0 0 1024 1024');
        expect(icon.props().children.props.d).toBe(icons.facebook);
        expect(icon.find('svg').length).toBe(1);
        expect(icon.find('path').length).toBe(1);
        expect(tree).toMatchSnapshot();
    }); 
    it('Icon renders with custom props', () => {
        const dummyProps = {
            icon: icons.vk,
            color: 'blue',
            size: 32,
            bgColor: 'green'
        }
        const icon = shallow(
            <Icon
                icon={dummyProps.icon}
                color={dummyProps.color}
                bgColor={dummyProps.bgColor}
                size={dummyProps.size}
            />
        );
        const tree = toJson(icon);

        expect(icon.instance().props.icon).toBe(dummyProps.icon);
        expect(icon.instance().props.color).toBe(dummyProps.color);
        expect(icon.instance().props.bgColor).toBe(dummyProps.bgColor);
        expect(icon.instance().props.size).toBe(dummyProps.size);
        expect(icon.props().style).toEqual({
            backgroundColor: dummyProps.bgColor,
            display: 'inline-block',
            verticalAlign: 'middle',
        });
        expect(icon.props().width).toBe(`${dummyProps.size}px`);
        expect(icon.props().height===icon.props().width).toBeTruthy();
        expect(icon.props().viewBox).toBe('0 0 1024 1024');
        expect(icon.props().children.props.d).toBe(dummyProps.icon);
        expect(icon.props().children.props.style.fill).toBe(dummyProps.color);
        expect(icon.find('svg').length).toBe(1);
        expect(icon.find('path').length).toBe(1);
        expect(tree).toMatchSnapshot();
    }); 
});
