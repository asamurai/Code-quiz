import React from 'react';
import PropTypes from 'prop-types';

/**
 * Icon component
 * 
 * @prop {string} icon      : icon path, required
 * @prop {number} size      : icon size, by default is 20
 * @prop {string} color     : icon color, by default is #ffffff
 * @prop {string} bgColor   : icon background color, by default is rgba(0, 0, 0, 0)
 * @prop {string} className : icon extends className 
 * 
 * @returns 
 */
const Icon = props => {
  const styles = {
    svg: {
      display: 'inline-block',
      verticalAlign: 'middle',
      backgroundColor: props.bgColor
    },
    path: {
      fill: props.color,
    },
  };

  return (
    <svg
      className={`${props.className}`.trim()}
      style={{...styles.svg, ...props.style}}
      width={`${props.size}px`}
      height={`${props.size}px`}
      viewBox="0 0 1024 1024"
    >
      <path
        style={styles.path}
        d={props.icon}
      />
    </svg>
  );
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  bgColor: PropTypes.string,
  className: PropTypes.string
};

Icon.defaultProps = {
  size: 20,
  bgColor: 'rgba(0,0,0,0)',
  color: '#ffffff',
  className: ''
};

export default Icon;
