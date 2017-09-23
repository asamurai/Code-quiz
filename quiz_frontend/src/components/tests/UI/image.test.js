import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { Image } from './../../ui';

const data = {
    src: 'https://cdn0.iconfinder.com/data/icons/seo-smart-pack/128/grey_new_seo3-07-512.png',
    className: 'imageClass',
    alt: 'img',
    width: 20,
    height: 20
};

describe('Image component test', () => {
    it('Image component test only with src prop', () => {
        const image = shallow(
            <Image
                src={data.src}
            />
        );
        const tree = toJson(image);

        expect(image.instance().props.src).toBe(data.src);
        expect(image.props().src).toBe(data.src);
        expect(image.instance().props.alt).toBe('');
        expect(image.props().alt).toBe('');
        expect(image.instance().props.className).toBe('');
        expect(image.props().className).toBe('');
        expect(tree).toMatchSnapshot();
    });
    it('Image component test only with all props', () => {
        const image = shallow(
            <Image
                src={data.src}
                alt={data.alt}
                className={data.className}
                width={data.width}
                height={data.height}
            />
        );
        const tree = toJson(image);

        expect(image.instance().props.src).toBe(data.src);
        expect(image.props().src).toBe(data.src);
        expect(image.instance().props.alt).toBe(data.alt);
        expect(image.props().alt).toBe(data.alt);
        expect(image.instance().props.className).toBe(data.className);
        expect(image.props().className).toBe(data.className);
        expect(image.instance().props.width).toBe(data.width);
        expect(image.instance().props.height).toBe(data.height);
        expect(image.props().style).toEqual({width: `${data.width}px`, height: `${data.height}px`});
        expect(tree).toMatchSnapshot();
    });
});
