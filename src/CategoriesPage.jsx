import React from 'react';
import SpotlightCard from './SpotlightCard.jsx';
import './CategoriesPage.css';

const categoriesData = [
  { name: 'AI Detection', count: 22 }, { name: 'Advertising', count: 24 }, { name: 'Audio', count: 18 },
  { name: 'Automation', count: 16 }, { name: 'Business Intelligence', count: 12 }, { name: 'Chat', count: 26 },
  { name: 'Coding', count: 15 }, { name: 'Content Marketing', count: 15 }, { name: 'Copywriting', count: 12 },
  { name: 'Deals', count: 5 }, { name: 'Design', count: 9 }, { name: 'Education', count: 18 },
  { name: 'Gaming', count: 12 }, { name: 'Generative Art', count: 12 }, { name: 'Generative Text', count: 17 },
  { name: 'Generative Video', count: 17 }, { name: 'Graphic Design', count: 16 }, { name: 'Image Editing', count: 16 },
  { name: 'Investing', count: 17 }, { name: 'Marketing', count: 17 }, { name: 'Music', count: 16 },
  { name: 'No Code', count: 16 }, { name: 'Podcasting', count: 15 }, { name: 'Productivity', count: 16 },
  { name: 'Recruitment', count: 16 }, { name: 'SEO', count: 16 }, { name: 'Social Media', count: 16 },
  { name: 'Text-to-Video', count: 16 }, { name: 'Text-to-Voice', count: 16 }, { name: 'Translation', count: 16 },
  { name: 'Video Editing', count: 16 }, { name: 'Video Generation', count: 16 }, { name: 'Transcription', count: 16 },
];

const CategoriesPage = ({ onNavigate }) => {
  return (
    <div className="categories-page">
      <h1 className="categories-title">Explore Categories</h1>
      <p className="categories-subtitle">Discover AI tools across {categoriesData.length} different categories.</p>
      <div className="categories-grid">
        {categoriesData.map((category) => (
          <SpotlightCard key={category.name} spotlightColor="rgba(124, 255, 103, 0.2)">
            <div className="category-card-content">
                <div className="category-info">
                    <h2 className="category-name">{category.name}</h2>
                    <p className="category-count">{category.count} Tools</p>
                </div>
                <button 
                  className="category-button" 
                  onClick={() => onNavigate({ page: 'tools', category: category.name })}
                >
                  View Tools
                </button>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;