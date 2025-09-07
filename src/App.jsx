import React, { useState } from 'react';
import Prism from './Prism.jsx';
import SplitText from './SplitText.jsx';
import DecryptedText from './DecryptedText.jsx';
import MagicBento from './MagicBento.jsx';
import CategoriesPage from './CategoriesPage.jsx'; // Import the new page
import './App.css';

// --- Landing Page Component ---
const LandingPage = ({ onNavigate }) => {
  return (
    <>
      <div className="landing-page-hero">
        <div className="background-container">
          <Prism
            animationType="rotate" timeScale={0.25} height={3.5} baseWidth={5.5}
            scale={3.6} hueShift={0.2} colorFrequency={1.5} noise={0.1}
            glow={2.0} bloom={0.5}
          />
        </div>
        <div className="content">
          <SplitText text="ToolFlux" className="title" splitType="chars"
            delay={80} duration={0.7} from={{ opacity: 0, y: 50, scale: 0.8 }}
            to={{ opacity: 1, y: 0, scale: 1 }}/>
          <DecryptedText text="Your All-in-One AI Toolbox."
            className="quote" encryptedClassName="quote-encrypted" animateOn="hover"
            speed={30} maxIterations={15}/>
          <button className="view-categories-btn" onClick={() => onNavigate('categories')}>
            View Categories
          </button>
        </div>
      </div>
      <main className="main-content">
        <MagicBento />
        <section className="cta-section">
          <div className="cta-content">
            <h2 className="cta-title">Start Exploring</h2>
            <p className="cta-subtitle">AI Tools, Animations, Components - One Click Away</p>
            <button className="cta-button" onClick={() => onNavigate('categories')}>
              Browse All Tools
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

// --- Main App Component ---
function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const categoriesForNav = [ 'AI Detection', 'Advertising', 'Audio', 'Automation', 'Chat', 'Coding' ];

  const renderPage = () => {
    switch (currentPage) {
      case 'categories':
        return <CategoriesPage />;
      case 'home':
      default:
        return <LandingPage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-logo" onClick={() => setCurrentPage('home')} style={{cursor: 'pointer'}}>ToolFlux</div>
        <div className="nav-links">
          <a href="#" onClick={() => setCurrentPage('home')}>Home</a>
          <div className="categories-dropdown-container"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}>
            <a href="#" onClick={() => setCurrentPage('categories')}>Categories</a>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                {categoriesForNav.map(category => (<a key={category} href="#">{category}</a>))}
                 <a href="#" onClick={() => setCurrentPage('categories')} className="view-all-link">View All...</a>
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