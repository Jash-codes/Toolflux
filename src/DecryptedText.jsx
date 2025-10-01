import React, { useState, useEffect, useRef } from 'react';

const DecryptedText = ({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = 'start',
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
  className = '',
  encryptedClassName = '',
  animateOn = 'hover'
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef(null);
  const containerRef = useRef(null);
  const revealedIndicesRef = useRef(new Set());

  const shuffleText = (originalText, currentRevealed) => {
    return originalText
      .split('')
      .map((char, i) => {
        if (char === ' ') return ' ';
        if (currentRevealed.has(i)) return originalText[i];
        return characters[Math.floor(Math.random() * characters.length)];
      })
      .join('');
  };

  const startAnimation = () => {
    setIsAnimating(true);
    let currentIteration = 0;
    revealedIndicesRef.current.clear();

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (sequential) {
          // This part of the logic is complex to translate directly and is less common.
          // For now, we focus on the more popular non-sequential scramble.
          // A full sequential reveal would require a different approach.
           setDisplayText(text); // Fallback for sequential
           clearInterval(intervalRef.current);
           setIsAnimating(false);
      } else {
        // Non-sequential scramble
        setDisplayText(shuffleText(text, revealedIndicesRef.current));
        currentIteration++;
        if (currentIteration >= maxIterations) {
          clearInterval(intervalRef.current);
          setIsAnimating(false);
          setDisplayText(text);
        }
      }
    }, speed);
  };
  
  const handleMouseEnter = () => {
    if (animateOn === 'hover') {
        startAnimation();
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <p
      ref={containerRef}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => { if(animateOn === 'hover') setDisplayText(text) }}
    >
        {displayText.split('').map((char, index) => (
            <span key={index} className={isAnimating ? encryptedClassName : ''}>
                {char}
            </span>
        ))}
    </p>
  );
};

export default DecryptedText;