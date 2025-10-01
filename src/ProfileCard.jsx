import React, { useRef, useLayoutEffect } from 'react';
import './ProfileCard.css';

const clamp = (value, min = 0, max = 100) => Math.min(Math.max(value, min), max);
const round = (value, precision = 3) => parseFloat(value.toFixed(precision));
const adjust = (value, fromMin, fromMax, toMin, toMax) => round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));
const easeInOutCubic = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

const ProfileCard = ({
  name, title, handle, status, contactText, avatarUrl,
  iconUrl = '', grainUrl = '', enableTilt = true,
  onContactClick // Changed back to onContactClick
}) => {
  const wrapRef = useRef(null);
  const cardRef = useRef(null);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const card = cardRef.current;
    if (!wrap || !card || !enableTilt) return;

    let rafId = null;

    const updateCardTransform = (offsetX, offsetY) => {
      const { clientWidth: width, clientHeight: height } = card;
      const percentX = clamp((100 / width) * offsetX);
      const percentY = clamp((100 / height) * offsetY);
      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const properties = {
        '--pointer-x': `${percentX}%`,
        '--pointer-y': `${percentY}%`,
        '--background-x': `${adjust(percentX, 0, 100, 35, 65)}%`,
        '--background-y': `${adjust(percentY, 0, 100, 35, 65)}%`,
        '--pointer-from-center': clamp(Math.hypot(centerY, centerX) / 50, 0, 1),
        '--rotate-x': `${round(-(centerX / 5))}deg`,
        '--rotate-y': `${round(centerY / 4)}deg`,
      };
      Object.entries(properties).forEach(([prop, val]) => wrap.style.setProperty(prop, val));
    };
    
    const createSmoothAnimation = (duration, startX, startY) => {
        const startTime = performance.now();
        const targetX = wrap.clientWidth / 2;
        const targetY = wrap.clientHeight / 2;
        const animationLoop = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = clamp(elapsed / duration);
            const easedProgress = easeInOutCubic(progress);
            const currentX = adjust(easedProgress, 0, 1, startX, targetX);
            const currentY = adjust(easedProgress, 0, 1, startY, targetY);
            updateCardTransform(currentX, currentY);
            if (progress < 1) rafId = requestAnimationFrame(animationLoop);
        };
        rafId = requestAnimationFrame(animationLoop);
    };

    const cancelAnimation = () => {
        if (rafId) cancelAnimationFrame(rafId);
    };
    
    const handlePointerMove = (e) => {
      const rect = card.getBoundingClientRect();
      updateCardTransform(e.clientX - rect.left, e.clientY - rect.top);
    };

    const handlePointerEnter = () => {
      cancelAnimation();
      wrap.classList.add('active');
      card.classList.add('active');
    };

    const handlePointerLeave = (e) => {
      createSmoothAnimation(600, e.offsetX, e.offsetY);
      wrap.classList.remove('active');
      card.classList.remove('active');
    };

    card.addEventListener('pointerenter', handlePointerEnter);
    card.addEventListener('pointermove', handlePointerMove);
    card.addEventListener('pointerleave', handlePointerLeave);
    
    const initialX = wrap.clientWidth - 70;
    const initialY = 60;
    updateCardTransform(initialX, initialY);
    createSmoothAnimation(1500, initialX, initialY);

    return () => {
      card.removeEventListener('pointerenter', handlePointerEnter);
      card.removeEventListener('pointermove', handlePointerMove);
      card.removeEventListener('pointerleave', handlePointerLeave);
      cancelAnimation();
    };
  }, [enableTilt]);

  const cardStyle = {
    '--icon': iconUrl ? `url(${iconUrl})` : 'none',
    '--grain': grainUrl ? `url(${grainUrl})` : 'none',
  };

  return (
    <div ref={wrapRef} className="pc-card-wrapper" style={cardStyle}>
      <section ref={cardRef} className="pc-card">
        <div className="pc-inside">
          <div className="pc-shine" />
          <div className="pc-glare" />
          <div className="pc-content pc-avatar-content">
            <img className="avatar" src={avatarUrl} alt={`${name} avatar`} />
            <div className="pc-user-info">
              <div className="pc-user-details">
                <div className="pc-mini-avatar">
                  <img src={avatarUrl} alt={`${name} mini avatar`} />
                </div>
                <div className="pc-user-text">
                  <div className="pc-handle">@{handle}</div>
                  <div className="pc-status">{status}</div>
                </div>
              </div>
              {/* --- FIX: Changed back to a <button> with an onClick handler --- */}
              <button className="pc-contact-btn" onClick={onContactClick} type="button">
                {contactText}
              </button>
            </div>
          </div>
          <div className="pc-content">
            <div className="pc-details">
              <h3>{name}</h3>
              <p>{title}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfileCard;