import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import CountUp from './CountUp.jsx';
import './MagicBento.css';

// Particle logic remains the same
const createParticleElement = (x, y, color) => {
  const el = document.createElement('div');
  el.className = 'bento-particle';
  Object.assign(el.style, {
    position: 'absolute', width: '4px', height: '4px', borderRadius: '50%',
    background: `rgba(${color}, 1)`, boxShadow: `0 0 6px rgba(${color}, 0.6)`,
    pointerEvents: 'none', zIndex: '100', left: `${x}px`, top: `${y}px`,
  });
  return el;
};

const BentoCard = ({ children, className, glowColor = '124, 255, 103' }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const particleMemo = useRef([]);

  useLayoutEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    if (particleMemo.current.length === 0) {
        const { width, height } = card.getBoundingClientRect();
        particleMemo.current = Array.from({ length: 12 }, () => createParticleElement(Math.random() * width, Math.random() * height, glowColor));
    }
    let activeParticles = [];
    const animateParticles = () => {
        particleMemo.current.forEach((particle, index) => {
            setTimeout(() => {
                if (!cardRef.current) return;
                const clone = particle.cloneNode(true);
                card.appendChild(clone);
                activeParticles.push(clone);
                gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });
                gsap.to(clone, { x: (Math.random() - 0.5) * 80, y: (Math.random() - 0.5) * 80, duration: 2 + Math.random() * 2, ease: 'none', repeat: -1, yoyo: true });
                gsap.to(clone, { opacity: 0, duration: 1.5, ease: 'power2.inOut', repeat: -1, yoyo: true, delay: 0.5 });
            }, index * 100);
        });
    };
    const clearParticles = () => {
        activeParticles.forEach(p => { gsap.to(p, { scale: 0, opacity: 0, duration: 0.3, onComplete: () => p.remove() }); });
        activeParticles = [];
    };
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; const y = e.clientY - rect.top;
      const centerX = rect.width / 2; const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8; const rotateY = ((x - centerX) / centerX) * 8;
      gsap.to(card, { rotateX, rotateY, duration: 0.1, ease: 'power2.out', transformPerspective: 1000 });
    };
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('mousemove', handleMouseMove);
    if(isHovered) { animateParticles(); } else {
        clearParticles();
        gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.3, ease: 'power2.out' });
    }
    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('mousemove', handleMouseMove);
      clearParticles();
    };
  }, [isHovered, glowColor]);

  return ( <div ref={cardRef} className={`bento-card ${className}`}> {children} </div> );
};


const MagicBento = ({ cardData }) => {
  return (
    <div className="bento-grid">
      {cardData.map((card, index) => (
        <BentoCard key={index} className={card.className}>
          <a href={card.url} target="_blank" rel="noopener noreferrer" className="bento-card-link">
            <div className="bento-card-content">
              {/* Top part of the card */}
              <div>
                {card.count >= 0 && (
                  <>
                    <h2 className="bento-title-count"><CountUp to={card.count} duration={2} />+</h2>
                    <p className="bento-subtitle">{card.title}</p>
                  </>
                )}
                {card.name && (
                  <div className="bento-tool-header">
                      <h3 className="bento-tool-name">{card.name}</h3>
                      {card.price && <span className="bento-tool-price">{card.price}</span>}
                  </div>
                )}
                {!card.count && !card.name && (
                    <h2 className="bento-title-full">{card.title}</h2>
                )}
                {card.description && (
                    <p className="bento-description">{card.description}</p>
                )}
              </div>
              
              {/* Bottom part of the card (the button) */}
              {card.url && (
                <div className="visit-tool-button">
                  Visit Tool &rarr;
                </div>
              )}
            </div>
          </a>
        </BentoCard>
      ))}
    </div>
  );
};

export default MagicBento;