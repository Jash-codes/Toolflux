import React from 'react';
import ShinyText from './ShinyText.jsx';
import ProfileCard from './ProfileCard.jsx';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* This ShinyText now uses a new class for green color */}
      <ShinyText
        className="about-title green-shine" 
        speed={4}
        text="Navigating the AI Universe"
      />

      <ShinyText
        className="about-shiny-text"
        speed={4}
        text="ToolFlux was born from a simple idea: the world of artificial intelligence is expanding at an explosive rate, but finding the right tool can feel like searching for a needle in a digital haystack. We are a curated hub dedicated to charting this new frontier, bringing you a comprehensive, organized, and constantly updated directory of AI tools."
      />
    

      <section className="developer-section">
        <h2 className="developer-title">About the Developer</h2>
        <ProfileCard
          name="Jashwanth"
          title="Full Stack Developer"
          handle="jash"
          status="Online"
          contactText="Get in Touch"
          avatarUrl="https://placehold.co/500x500/000000/7CFF67?text=J"
          onContactClick={() => window.open('https://www.linkedin.com/in/jashwanth-g-0b0a91276', '_blank')}
        />
      </section>
    </div>
  );
};

export default AboutPage;