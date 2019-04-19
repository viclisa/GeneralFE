import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const Logo = ({ x, y, width, height, viewBox }) => {
  const viewBoxAttr = '0 0 ' + viewBox + ' ' + viewBox;
  const viewBoxBackgr = 'new 0 0 ' + viewBox + ' ' + viewBox;
  return (
    <section className='header'>
      <svg
        className='shrine-logo'
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        x={x}
        y={y}
        width={width}
        height={height}
        viewBox={viewBoxAttr}
        enableBackground={viewBoxBackgr}
        xmlSpace='preserve'
        fill='#000000'
        focusable='false'
      >
        <g>
          <g>
            <path
              d='M17,2H7L2,6.62L12,22L22,6.62L17,2z M16.5,3.58l3.16,2.92H16.5V3.58z M7.59,3.5H15v3H4.34L7.59,3.5z
                  M11.25,18.1L7.94,13h3.31V18.1z M11.25,11.5H6.96L4.69,8h6.56V11.5z M16.5,12.32 M12.75,18.09V8h6.56L12.75,18.09z'
            />
          </g>
          <rect fill='none' width={viewBox} height={viewBox} />
        </g>
      </svg>
      <h1>SHRINE</h1>
    </section>
  );
};

Logo.propTypes = {
  x: PropTypes.string.isRequired,
  y: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  viewBox: PropTypes.string.isRequired
};

export default Logo;
