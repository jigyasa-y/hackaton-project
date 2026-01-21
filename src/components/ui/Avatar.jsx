import React from 'react';

const Avatar = ({ 
  name, 
  size = 'md',
  className = '',
  src,
  ...props 
}) => {
  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-lg',
  };
  
  const initials = name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || '?';
  
  return (
    <div
      className={`
        ${sizes[size]} 
        rounded-full 
        bg-gradient-to-br from-blue-500 to-blue-600
        flex items-center justify-center
        text-white font-semibold
        shadow-sm
        ${className}
      `}
      {...props}
    >
      {src ? (
        <img 
          src={src} 
          alt={name || 'Avatar'} 
          className="h-full w-full rounded-full object-cover"
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};

export default Avatar;

