import React from 'react';

const Card = ({ 
  children, 
  className = '',
  padding = 'md',
  hover = false,
  ...props 
}) => {
  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
  };
  
  const hoverStyles = hover ? 'hover:shadow-lg transition-shadow duration-200' : '';
  
  return (
    <div
      className={`
        bg-white rounded-xl shadow-sm border border-gray-200
        ${paddings[padding]}
        ${hoverStyles}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;

