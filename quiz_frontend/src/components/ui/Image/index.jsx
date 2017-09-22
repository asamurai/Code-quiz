import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Image component
 * 
 * @prop {string} src         : source path to the image, required
 * @prop {string} alt         : alt title of the image, by default is ''
 * @prop {string} className   : className of the image, by default is ''
 * @prop {number} width       : width of image
 * @prop {number} height      : height of image
 * 
 * @class Image
 * @extends {Component}
 */
class Image extends Component {
    render () {
        const { src, alt, width, height, className } = this.props;
        const style = width && height ? {width: `${width}px`, height: `${height}px`} : {};
        return (
            <img 
                src={src} 
                alt={alt} 
                className={className}
                style={style}
            />
        );
    }
}

Image.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    className: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number
};

Image.defaultProps = {
    alt: '',
    className: '',
};

export default Image;
