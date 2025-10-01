import React, { useEffect, useRef, useState } from 'react';

const CountUp = ({ to, from = 0, duration = 5, delay = 0, className = '', separator = ',' }) => {
  const elementRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const animationIdRef = useRef(null);

  const formatNumber = (value) => {
    const num = Math.round(value);
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  };

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp = null;
    const animate = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      
      // Simple ease-out function
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      
      const currentValue = from + (to - from) * easedProgress;
      
      if (elementRef.current) {
        elementRef.current.textContent = formatNumber(currentValue);
      }
      
      if (progress < 1) {
        animationIdRef.current = requestAnimationFrame(animate);
      } else {
        if (elementRef.current) {
            elementRef.current.textContent = formatNumber(to);
        }
      }
    };

    const timeoutId = setTimeout(() => {
        animationIdRef.current = requestAnimationFrame(animate);
    }, delay * 1000);

    return () => {
        clearTimeout(timeoutId);
        if (animationIdRef.current) {
            cancelAnimationFrame(animationIdRef.current);
        }
    };
  }, [isInView, to, from, duration, delay, separator]);

  return <span ref={elementRef} className={className}>{formatNumber(from)}</span>;
};

export default CountUp;