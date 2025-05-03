import React from 'react';

export function Input({
  className = '',
  type = 'text',
  error = false,
  ...props
}) {
  const baseStyle = 'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50';
  const errorStyle = 'border-red-300 focus:ring-red-500';
  
  const styles = `${baseStyle} ${error ? errorStyle : ''} ${className}`;
  
  return (
    <input
      type={type}
      className={styles}
      {...props}
    />
  );
}