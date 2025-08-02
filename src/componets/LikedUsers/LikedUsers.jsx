// components/LikedUsers.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LikedUsers.css';

const LikedUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('favoriteUsers') || '[]');
    setUsers(Array.isArray(stored) ? stored : []);
  }, []);

  const handleRemove = (userId) => {
    const updated = users.filter(user => user?.login?.uuid !== userId);
    localStorage.setItem('favoriteUsers', JSON.stringify(updated));
    setUsers(updated);
  };

  return (
    <div className="favorites-container">
      <h1>Favorites</h1>

      {users.length === 0 ? (
        <div className="no-content">
          <span className="icon">⭐️</span>
          <p>No favorites yet</p>
          <p>Click the star button to add favorites</p>
        </div>
      ) : (
        <div className="users-grid">
          {users.map(user => {
            const uuid = user?.login?.uuid;
            const name = `${user?.name?.first || 'Unknown'} ${user?.name?.last || ''}`;
            const email = user?.email || 'N/A';
            const picture = user?.picture?.medium || 'https://via.placeholder.com/100';

            return (
              <div
                key={uuid}
                className="user-card"
                style={{
                  border: '2px solid #4CAF50',
                  boxShadow: '0 4px 15px rgba(76, 175, 80, 0.2)'
                }}
              >
                <img src={picture} alt={user?.name?.first || 'User'} />
                <h3>{name}</h3>
                <p>{email}</p>
                <div className="user-actions">
                  <button
                    onClick={() => handleRemove(uuid)}
                    className="favorite-button"
                  >
                    Remove Favorite
                  </button>
                  <Link to={`/team/${uuid}`} state={{ user }}>
                    View Profile
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Link to="/team" className="btn-primary" style={{ marginTop: '2rem', display: 'inline-block' }}>
        ← Back to Team
      </Link>
    </div>
  );
};

export default LikedUsers;