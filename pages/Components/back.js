import React from 'react';
import Fade from 'react-reveal/Fade'

export default function Back({ handleClick }) {
  return (
    <Fade left cascade duration={500}>
      
      <div className="back" >
        <a onClick={handleClick} > <i className="fa fa-arrow-circle-left"></i> </a>
      </div>
    </Fade>
  );
}

