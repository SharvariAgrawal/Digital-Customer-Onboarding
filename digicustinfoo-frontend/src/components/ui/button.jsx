import React from 'react';

export function Button({
  className = '',
  variant = 'default',
  type = 'button',
  disabled = false,
  children,
  ...props
}) {
  const baseStyle = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700 h-10 py-2 px-4',
    outline: 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 h-10 py-2 px-4',
  };
  
  const styles = `${baseStyle} ${variants[variant]} ${className}`;
  
  return (
    <button
      type={type}
      className={styles}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}