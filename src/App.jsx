import React, { useState } from 'react';
import Prism from './Prism.jsx';
import SplitText from './SplitText.jsx'; // Import the new SplitText component
import './App.css';

const categories = [
    'AI Detection', 'Advertising', 'Audio', 'Automation', 'Chat', 'Coding', 
    'Content Marketing', 'Design', 'Generative Art', 'Productivity', 'SEO', 'Video'
];

function App() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="landing-page">
      <div className="background-container">
        <Prism
          animationType="rotate"
          timeScale={0.25}
          height={3.5}
          baseWidth={5.5}
          scale={3.6}
          hueShift={0.2}
          colorFrequency={1.5}
          noise={0.1}
          glow={2.0}
          bloom={0.5}
        />
      </div>

      <nav className="navbar">
        <div className="nav-logo">ToolFlux</div>
        <div className="nav-links">
          <a href="#">Home</a>
          <div 
            className="categories-dropdown-container"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <a href="#">Categories</a>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                {categories.map(category => (
                  <a key={category} href="#">{category}</a>
                ))}
              </div>
            )}
          </div>
          <a href="#">About</a>
        </div>
      </nav>

      <div className="content">
        {/* Replace the h1 with the SplitText component */}
        <SplitText 
          text="ToolFlux"
          className="title"
          splitType="chars"
          delay={80}
          duration={0.7}
          from={{ opacity: 0, y: 50, scale: 0.8 }}
          to={{ opacity: 1, y: 0, scale: 1 }}
        />
        <p className="quote">Your All-in-One AI Toolbox.</p>
        <button className="get-started-btn">Get Started</button>
      </div>
    </div>
  );
}

export default App;