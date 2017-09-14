import React from 'react';
import PropTypes from 'prop-types';

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
  bgColor: PropTypes.string
};

Icon.defaultProps = {
  size: 20,
  bgColor: 'rgba(0,0,0,0)',
  color: '#ffffff'
};

export default Icon;
