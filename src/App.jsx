import React, { useState } from 'react';
import Aurora from './Aurora.jsx';
import SplitText from './SplitText.jsx';
import DecryptedText from './DecryptedText.jsx';
import MagicBento from './MagicBento.jsx';
import CategoriesPage from './CategoriesPage.jsx';
import SpotlightCard from './SpotlightCard.jsx'; // FIX: This import was missing
import './App.css';

// Mock Component for showing tools of a specific category
const ToolsPage = ({ category, onNavigate }) => (
  <div className="tools-page-placeholder">
    <h1>Tools for: {category}</h1>
    <p>This is where the list of tools for "{category}" will be displayed.</p>
    <button className="view-categories-btn" onClick={() => onNavigate({ page: 'categories', category: null })}>
      Back to All Categories
    </button>
  </div>
);


// --- Landing Page Component ---
const LandingPage = ({ onNavigate }) => {
  return (
    <>
      <div className="landing-page-hero">
        <div className="background-container">
          <Aurora
            colorStops={['#7CFF67', '#000000', '#7CFF67']}
            speed={1.5} blend={0.6} intensity={1.2}
          />
        </div>
        <div className="content">
          <SplitText text="ToolFlux" className="title" splitType="chars"
            delay={80} duration={0.7} from={{ opacity: 0, y: 50, scale: 0.8 }}
            to={{ opacity: 1, y: 0, scale: 1 }}/>
          <DecryptedText text="Your All-in-One AI Toolbox."
            className="quote" encryptedClassName="quote-encrypted" animateOn="hover"
            speed={30} maxIterations={15}/>
          <button className="view-categories-btn" onClick={() => onNavigate({ page: 'categories' })}>
            View Categories
          </button>
        </div>
      </div>
      <main className="main-content">
        <MagicBento />
        <SpotlightCard className="cta-card" spotlightColor="rgba(124, 255, 103, 0.2)">
            <div className="cta-content">
                <h2 className="cta-title">Start Exploring</h2>
                <p className="cta-subtitle">AI Tools, Animations, Components - One Click Away</p>
                <button className="view-categories-btn" onClick={() => onNavigate({ page: 'categories' })}>
                  Browse All Tools
                </button>
            </div>
        </SpotlightCard>
      </main>
    </>
  );
};

// --- Main App Component ---
function App() {
  const [pageState, setPageState] = useState({ page: 'home', category: null });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const categoriesForNav = [ 'AI Detection', 'Advertising', 'Audio', 'Automation', 'Chat', 'Coding' ];

  const handleNavigate = (newState) => {
    setPageState(newState);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (pageState.page) {
      case 'tools':
        return <ToolsPage category={pageState.category} onNavigate={handleNavigate} />;
      case 'categories':
        return <CategoriesPage onNavigate={handleNavigate} />;
      case 'home':
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-logo" onClick={() => handleNavigate({ page: 'home' })} style={{cursor: 'pointer'}}>ToolFlux</div>
        <div className="nav-links">
          <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate({ page: 'home' }); }}>Home</a>
          <div className="categories-dropdown-container"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}>
            <a href="#" onClick={(e) => e.preventDefault()}>Categories</a>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                {categoriesForNav.map(category => (
                  <a key={category} href="#" onClick={(e) => { e.preventDefault(); handleNavigate({ page: 'tools', category }); }}>
                    {category}
                  </a>
                ))}
                 <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate({ page: 'categories' }); }} className="view-all-link">
                   View All...
                 </a>
              </div>
            )}
          </div>
          <a href="#">About</a>
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