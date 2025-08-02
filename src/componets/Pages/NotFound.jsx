import React from 'react';
import './NotFound.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-icon">🔍</div>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <div className="action-buttons">
          <Link to="/" className="back-button">
            <span className="button-icon">🏠</span> Back to Home
          </Link>
          <Link to="/" className="back-button">
            <span className="button-icon">🔄</span> Try Again
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
