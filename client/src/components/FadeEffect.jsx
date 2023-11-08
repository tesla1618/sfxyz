import React, { useState, useEffect } from 'react';
import '../css/style.css'; // Adjust the path based on your project structure

const FadeEffect = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the slide-in and fade-in effect after a short delay
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 0);

    // Clear the timeout when the component unmounts
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`slide-fade-in ${isVisible ? 'active' : ''}`}>
      {children}
    </div>
  );
};

export default FadeEffect;
