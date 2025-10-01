import React from 'react';
import './ShinyText.css'; // We'll create this file next

const ShinyText = ({
  text,
  disabled = false,
  speed = 5,
  className = '',
}) => {
  const animationDuration = `${speed}s`;

  const inlineStyles = {
    '--animation-duration': animationDuration,
  };

  return (
    <div
      className={`shiny-text-container ${!disabled ? 'animate-shine' : ''} ${className}`}
      style={inlineStyles}
    >
      {text}
    </div>
  );
};

export default ShinyText;