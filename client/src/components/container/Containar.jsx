import React from 'react'

const Containar = ({ children, className }) => {
    return (
      <div className={`container mx-auto ${className}`}>
        {children}
      </div>
    );
  };
  
  export default Containar;