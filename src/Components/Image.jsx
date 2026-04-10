import React from 'react';

const Image = ({ImgSrc,className}) => {
    return ( <img src={ImgSrc} alt="" className={className} />);
};

export default Image;