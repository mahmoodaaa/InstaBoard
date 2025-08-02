import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1>About InstaBoard</h1>
      <div className="about-content">
        <div className="about-section">
          <h2>Our Story</h2>
          <p>InstaBoard is a modern, feature-rich platform designed to bring your team together in one place. We believe in the power of collaboration and communication, and our platform is built to make that as seamless as possible.</p>
        </div>
        
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>Our mission is to provide teams with the tools they need to work together more effectively. We strive to create a platform that is intuitive, powerful, and adaptable to the needs of any team.</p>
        </div>

        <div className="about-section">
          <h2>Why Choose Us</h2>
          <ul>
            <li>Real-time collaboration</li>
            <li>Modern, intuitive interface</li>
            <li>Powerful features for teams</li>
            <li>Responsive support</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
