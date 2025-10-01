import React, { useRef, useLayoutEffect } from 'react';
import './LetterGlitch.css';

const LetterGlitch = ({
  glitchColors = ['#2b4539', '#61dca3', '#61b3dc'],
  glitchSpeed = 50,
  smooth = true,
  centerVignette = false,
}) => {
  const canvasRef = useRef(null);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let lastGlitchTime = Date.now();
    const fontSize = 16;
    const charWidth = 10;
    const charHeight = 20;

    const lettersAndSymbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-=_+[]{}<>,.0123456789';
    const getRandomChar = () => lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)];
    const getRandomColor = () => glitchColors[Math.floor(Math.random() * glitchColors.length)];

    let grid = { columns: 0, rows: 0 };
    let letters = [];

    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
    };

    const interpolateColor = (start, end, factor) => {
      const result = {
        r: Math.round(start.r + (end.r - start.r) * factor),
        g: Math.round(start.g + (end.g - start.g) * factor),
        b: Math.round(start.b + (end.b - start.b) * factor),
      };
      return `rgb(${result.r}, ${result.g}, ${result.b})`;
    };

    const initializeLetters = (columns, rows) => {
      grid = { columns, rows };
      letters = Array.from({ length: columns * rows }, () => ({
        char: getRandomChar(),
        color: getRandomColor(),
        targetColor: getRandomColor(),
        colorProgress: 1,
      }));
    };

    const drawLetters = () => {
      if (!ctx) return;
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      ctx.font = `${fontSize}px monospace`;
      ctx.textBaseline = 'top';

      letters.forEach((letter, index) => {
        const x = (index % grid.columns) * charWidth;
        const y = Math.floor(index / grid.columns) * charHeight;
        ctx.fillStyle = letter.color;
        ctx.fillText(letter.char, x, y);
      });
    };

    const updateLetters = () => {
      const updateCount = Math.max(1, Math.floor(letters.length * 0.05));
      for (let i = 0; i < updateCount; i++) {
        const index = Math.floor(Math.random() * letters.length);
        if (!letters[index]) continue;
        letters[index].char = getRandomChar();
        if (smooth) {
          letters[index].targetColor = getRandomColor();
          letters[index].colorProgress = 0;
        } else {
          letters[index].color = getRandomColor();
        }
      }
    };
    
    // --- FIX IS IN THIS FUNCTION ---
    const animate = () => {
      const now = Date.now();
      if (now - lastGlitchTime >= glitchSpeed) {
        updateLetters();
        lastGlitchTime = now;
      }

      if (smooth) {
        // This part updates the color values in the data array
        letters.forEach(letter => {
          if (letter.colorProgress < 1) {
            letter.colorProgress = Math.min(1, letter.colorProgress + 0.05);
            const startRgb = hexToRgb(letter.color);
            const endRgb = hexToRgb(letter.targetColor);
            if (startRgb && endRgb) {
              letter.color = interpolateColor(startRgb, endRgb, letter.colorProgress);
            }
          }
        });
      }
      
      // This part redraws the canvas on every single frame, ensuring the animation never stops
      drawLetters();
      
      animationFrameId = requestAnimationFrame(animate);
    };

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const { columns, rows } = { columns: Math.ceil(rect.width / charWidth), rows: Math.ceil(rect.height / charHeight) };
      initializeLetters(columns, rows);
    };

    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [glitchColors, glitchSpeed, smooth]);

  return (
    <div className="letter-glitch-wrapper">
      <canvas ref={canvasRef} />
      {centerVignette && <div className="center-vignette" />}
    </div>
  );
};

export default LetterGlitch;