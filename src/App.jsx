import React, { useState, useEffect, useRef } from 'react';
import LetterGlitch from './LetterGlitch.jsx';
import SplitText from './SplitText.jsx';
import DecryptedText from './DecryptedText.jsx';
import MagicBento from './MagicBento.jsx';
import CategoriesPage from './CategoriesPage.jsx';
import SpotlightCard from './SpotlightCard.jsx';
import ToolsPage from './ToolsPage.jsx';
import AboutPage from './AboutPage.jsx';
import './App.css';

const landingPageBentoData = [
  { count: 544, title: 'AI Tools', description: 'Curated from across the web.', className: 'col-span-1 md:col-span-2' },
  { count: 33, title: 'Categories', description: 'From copywriting to coding.', className: 'col-span-1' },
  { title: 'Free & Open Source', description: 'Continuously growing and getting better for the community.', className: 'col-span-1 md:col-span-3' },
];

const LandingPage = ({ onNavigate }) => {
  return (
    <>
      <div className="landing-page-hero">
        <div className="background-container">
          <LetterGlitch
            glitchColors={['#0d1117', '#7CFF67']}
            glitchSpeed={50}
            smooth={true}
            centerVignette={true}
          />
        </div>
        <div className="content">
          <SplitText text="ToolFlux" className="title" splitType="chars" delay={80} duration={0.7} from={{ opacity: 0, y: 50, scale: 0.8 }} to={{ opacity: 1, y: 0, scale: 1 }}/>
          <DecryptedText text="Your All-in-One AI Toolbox." className="quote" encryptedClassName="quote-encrypted" animateOn="hover" speed={30} maxIterations={15}/>
          <button className="view-categories-btn" onClick={() => onNavigate({ page: 'categories' })}>View Categories</button>
        </div>
      </div>
      <main className="main-content">
        <MagicBento cardData={landingPageBentoData} />
        <SpotlightCard className="cta-card" spotlightColor="rgba(124, 255, 103, 0.2)">
            <div className="cta-content">
                <h2 className="cta-title">Start Exploring</h2>
                <p className="cta-subtitle">AI Tools, Animations, Components - One Click Away</p>
                <button className="view-categories-btn" onClick={() => onNavigate({ page: 'categories' })}>Browse All Tools</button>
            </div>
        </SpotlightCard>
      </main>
    </>
  );
};

function App() {
  const [pageState, setPageState] = useState({ page: 'home', category: null });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const categoriesForNav = [ 'AI Detection', 'Advertising', 'Audio', 'Automation', 'Chat',  ];
  
  const handleNavigate = (newState) => {
    setPageState(newState);
    setIsDropdownOpen(false);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const renderPage = () => {
    switch (pageState.page) {
      case 'tools': return <ToolsPage category={pageState.category} onNavigate={handleNavigate} />;
      case 'categories': return <CategoriesPage onNavigate={handleNavigate} />;
      case 'about': return <AboutPage />;
      case 'home':
      default: return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-logo" onClick={() => handleNavigate({ page: 'home' })} style={{cursor: 'pointer'}}>ToolFlux</div>
        <div className="nav-links">
          <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate({ page: 'home' }); }}>Home</a>
          <div className="categories-dropdown-container" ref={dropdownRef}>
            <button className="nav-button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>Categories</button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                {categoriesForNav.map(category => (
                  <a key={category} href="#" onClick={(e) => { e.preventDefault(); handleNavigate({ page: 'tools', category }); }}>{category}</a>
                ))}
                 <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate({ page: 'categories' }); }} className="view-all-link">View All...</a>
              </div>
            )}
          </div>
          <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate({ page: 'about'})}}>About</a>
        </div>
      </nav>
      
      {renderPage()}

      <footer className="footer">
        <p>&copy; 2025 ToolFlux. All rights reserved.</p>
      </footer>
    </>
  );
}
export default App;