// LoadingSpinner.tsx
import React from 'react';
import './spinner.scss';
const LoadingSpinner: React.FC = () => {
  return (
    <div className="spinner">
      <div className="double-bounce1"></div>
      <div className="double-bounce2"></div>
    </div>
  );
};

export default LoadingSpinner;