import React from 'react';

const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-surface border border-gray-800 rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  );
};
