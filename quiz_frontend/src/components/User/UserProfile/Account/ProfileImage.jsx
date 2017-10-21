import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProfileImage extends Component {
    render () {
        const {
            url,
            mode
        } = this.props;

        if (!url || url === '') {
            return (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#c9c9c9',
                        height: '250px',
                        width: '200px'
                    }}
                >
                    <b>No image</b>
                </div>
            );
        }

        if (mode === 'full') {
            return (
                <div
                    style={{
                        backgroundImage: `url(${url})`,
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover',
                        height: '250px',
                        width: '200px'
                    }}
                />
            );
        }

        if (mode === 'preview') {
            return (
                <div
                    style={{
                        backgroundImage: `url(${url})`,
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover',
                        height: '250px',
                        width: '200px'
                    }}
                />
            );          
        }
        return <span/>;
    }
}

ProfileImage.defaultProps ={
    url: ''
};

ProfileImage.propTypes = {
    url: PropTypes.string,
    mode: PropTypes.oneOf(['preview', 'full'])
};

export default ProfileImage;
