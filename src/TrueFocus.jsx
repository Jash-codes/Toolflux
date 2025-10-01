import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import './TrueFocus.css';

const TrueFocus = ({
  sentence,
  blurAmount = 3,
  borderColor = 'green',
  animationDuration = 0.6,
  pauseBetweenAnimations = 0.5,
}) => {
  const words = sentence.split(' ');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const containerRef = useRef(null);
  const wordRefs = useRef([]); // This ref will hold an array of DOM elements

  // This effect runs the animation loop to cycle through words
  useEffect(() => {
    const animationInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, (animationDuration + pauseBetweenAnimations) * 1000);

    return () => clearInterval(animationInterval);
  }, [words.length, animationDuration, pauseBetweenAnimations]);

  // This effect runs after every render to calculate the position of the focus box
  useLayoutEffect(() => {
    if (wordRefs.current.length === 0 || !containerRef.current) return;

    const currentWordEl = wordRefs.current[currentIndex];
    if (!currentWordEl) return;

    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect = currentWordEl.getBoundingClientRect();

    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height,
    });
  }); // By omitting the dependency array, this runs on every single render

  // Before rendering, we reset the array so it can be repopulated with fresh refs
  wordRefs.current = [];

  return (
    <div className="true-focus-container" ref={containerRef}>
      {words.map((word, index) => (
        <span
          key={index}
          // The ref callback populates the array on each render
          ref={(el) => { if(el) wordRefs.current[index] = el; }}
          className="true-focus-word"
          style={{
            filter: index === currentIndex ? 'blur(0px)' : `blur(${blurAmount}px)`,
            transition: `filter ${animationDuration}s ease`,
          }}
        >
          {word}
        </span>
      ))}

      <motion.div
        className="true-focus-box"
        initial={false} // Prevents animation on initial load
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: 1,
        }}
        transition={{ duration: animationDuration, ease: 'easeOut' }}
        style={{ '--border-color': borderColor }}
      >
        <span className="corner top-left"></span>
        <span className="corner top-right"></span>
        <span className="corner bottom-left"></span>
        <span className="corner bottom-right"></span>
      </motion.div>
    </div>
  );
};

export default TrueFocus;