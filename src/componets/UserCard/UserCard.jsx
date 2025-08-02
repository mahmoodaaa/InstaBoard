import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserCard.css';

const UserCard = ({ user = {}, onClick }) => {
  const [likes, setLikes] = useState(0);
  const [showEmail, setShowEmail] = useState(false);

  const handleLike = () => {
    if (!user.id) {
      alert('User not found!');
      return;
    }
    setLikes(prevLikes => prevLikes + 1);
  };

  if (!user.id) {
    return (
      <div className="user-card not-found">
        <h3>User Not Found</h3>
      </div>
    );
  }

  return (
    <div 
      className="user-card" 
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div className="user-profile">
        <img 
          src={user.picture || 'https://via.placeholder.com/150'} 
          alt={user.name} 
          className="user-image" 
        />
        <h3>{user.name || 'No Name'}</h3>
        {showEmail && (
          <p className="user-email">{user.email || 'No email available'}</p>
        )}
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
    </div>
  );
};

export default UserCard;