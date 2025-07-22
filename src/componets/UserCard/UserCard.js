import React, { useState } from 'react';
import './UserCard.css';

const UserCard = ({ picture, name, email }) => {
  const [likes, setLikes] = useState(0);
  const [showEmail, setShowEmail] = useState(false);

  const handleLike = () => {
    setLikes(prevLikes => prevLikes + 1);
  };

  return (
    <div className="user-card">
      <div className="user-profile">
        <img src={picture} alt={name} className="user-image" />
        <h3>{name}</h3>
      </div>
      
      <div className="user-actions">
        <button onClick={handleLike} className="like-button">
          <span className="like-icon">❤️</span>
          <span>{likes} Likes</span>
        </button>
        
        <button 
          onClick={() => setShowEmail(!showEmail)} 
          className="email-toggle-button"
        >
          {showEmail ? 'Hide Email' : 'Show Email'}
        </button>
      </div>

      {showEmail && (
        <div className="user-email">
          <p>Email: {email}</p>
        </div>
      )}
    </div>
  );
};

export default UserCard;