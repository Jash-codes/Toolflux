import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

const SplitText = ({
  text,
  className = '',
  delay = 100,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  onAnimationComplete = () => {}
}) => {
  const textRef = useRef(null);

  // useLayoutEffect is preferred for DOM manipulations to avoid flicker
  useLayoutEffect(() => {
    if (!textRef.current || !text) return;

    const el = textRef.current;
    
    // Create the SplitText instance
    let splitter = new GSAPSplitText(el, {
      type: splitType,
      linesClass: 'split-line'
    });

    let targets;
    switch (splitType) {
      case 'lines':
        targets = splitter.lines;
        break;
      case 'words':
        targets = splitter.words;
        break;
      case 'chars':
      default:
        targets = splitter.chars;
        break;
    }

    if (!targets || targets.length === 0) {
      console.warn('No targets found for SplitText animation');
      splitter.revert();
      return;
    }

    // Set initial state (from)
    gsap.set(targets, { ...from });
    
    // Create the animation timeline
    const tl = gsap.timeline({
      onComplete: () => {
        if (onAnimationComplete) onAnimationComplete();
        // Clean up GSAP's inline styles after animation
        if(splitter) splitter.revert();
      }
    });

    // Add the animation to the timeline
    tl.to(targets, {
      ...to,
      duration: duration,
      ease: ease,
      stagger: delay / 1000, // GSAP stagger is in seconds
    });

    // Cleanup function to run when the component unmounts or text changes
    return () => {
      if (tl) tl.kill();
      if (splitter) splitter.revert();
    };
  }, [text, delay, duration, ease, splitType, from, to, onAnimationComplete]);

  return (
    <h1 ref={textRef} className={className} style={{ textAlign: 'center' }}>
      {text}
    </h1>
  );
};

export default SplitText;