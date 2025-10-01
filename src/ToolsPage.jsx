import React from 'react';
import MagicBento from './MagicBento.jsx';
import { toolsData } from './toolsData.js'; // Import our data
import './ToolsPage.css'; // New stylesheet

const ToolsPage = ({ category, onNavigate }) => {
  const tools = toolsData[category] || [];

  return (
    <div className="tools-page">
      <div className="tools-page-header">
        <button className="back-button" onClick={() => onNavigate({ page: 'categories' })}>
          &larr; Back to Categories
        </button>
        <h1 className="tools-page-title">{category}</h1>
        <p className="tools-page-subtitle">
          Discover {tools.length} curated AI tools for {category.toLowerCase()}.
        </p>
      </div>
      
      {/* Use the reusable MagicBento component to display the tools */}
      <MagicBento cardData={tools} />
    </div>
  );
};

export default ToolsPage;