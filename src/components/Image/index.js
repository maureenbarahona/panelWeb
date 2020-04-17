import React from 'react';

const Image = props => {
    const {
      alt,
      ...otherProps
    } = props;
  
    return (
      <img alt={alt} {...otherProps} />
    );
  }
export default Image;