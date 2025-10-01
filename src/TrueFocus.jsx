import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion } from 'motion/react';
import './TrueFocus.css'; // We'll create this next

const TrueFocus = ({
  sentence,
  blurAmount = 5,
  borderColor = 'green',
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
}) => {
  const words = sentence.split(' ');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const containerRef = useRef(null);
  const wordRefs = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, (animationDuration + pauseBetweenAnimations) * 1000);
    return () => clearInterval(interval);
  }, [words.length, animationDuration, pauseBetweenAnimations]);

  useLayoutEffect(() => {
    if (wordRefs.current[currentIndex] && containerRef.current) {
      const parentRect = containerRef.current.getBoundingClientRect();
      const activeRect = wordRefs.current[currentIndex].getBoundingClientRect();
      setFocusRect({
        x: activeRect.left - parentRect.left,
        y: activeRect.top - parentRect.top,
        width: activeRect.width,
        height: activeRect.height,
      });
    }
  }, [currentIndex]);

  return (
    <div className="true-focus-container" ref={containerRef}>
      {words.map((word, index) => (
        <span
          key={index}
          ref={(el) => (wordRefs.current[index] = el)}
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
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: currentIndex >= 0 ? 1 : 0,
        }}
        transition={{ duration: animationDuration }}
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