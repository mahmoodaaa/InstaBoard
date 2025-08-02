import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to InstaBoard</h1>
        <p>Your Collaborative Workspace Solution</p>
        <div className="cta-buttons">
          <button className="primary-button">Get Started</button>
          <button className="secondary-button">Learn More</button>
        </div>
      </div>

      <div className="features-section">
        <div className="feature-card">
          <h3>Real-time Collaboration</h3>
          <p>Work together in real-time with your team members.</p>
        </div>
        <div className="feature-card">
          <h3>Team Management</h3>
          <p>Organize and manage your team members effectively.</p>
        </div>
        <div className="feature-card">
          <h3>Modern Interface</h3>
          <p>A clean, intuitive design that's easy to use.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
