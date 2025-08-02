// components/Team.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Team.css';

const Team = () => {
  const [users, setUsers] = useState([]);
  const [results, setResults] = useState(12);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [likedUserIds, setLikedUserIds] = useState(new Set());
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    const storedLiked = JSON.parse(localStorage.getItem('likedUsers') || '[]');
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteUsers') || '[]');

    const likedIds = new Set(storedLiked);
    const favoriteIds = new Set(storedFavorites.map(user => user.login?.uuid || ''));

    setLikedUserIds(likedIds);
    setFavorites(favoriteIds);

    fetchUsers();
  }, [page, results]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://randomuser.me/api/?results=${results}&page=${page}`);
      const data = await response.json();
      setUsers(prev => [...prev, ...data.results]);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = (userId) => {
    try {
      const updatedLiked = new Set(likedUserIds);
      const storedFavorites = JSON.parse(localStorage.getItem('favoriteUsers') || '[]');

      const user = users.find(u => u.login.uuid === userId);
      const isLiked = likedUserIds.has(userId);
      const isFavorited = favorites.has(userId);

      if (isLiked) {
        updatedLiked.delete(userId);
      } else {
        updatedLiked.add(userId);
      }

      let newFavorites;
      if (isFavorited) {
        newFavorites = storedFavorites.filter(u => u.login.uuid !== userId);
      } else {
        if (user) {
          const alreadyExists = storedFavorites.some(u => u.login.uuid === userId);
          newFavorites = alreadyExists ? storedFavorites : [...storedFavorites, user];
        } else {
          newFavorites = storedFavorites;
        }
      }

      localStorage.setItem('likedUsers', JSON.stringify([...updatedLiked]));
      localStorage.setItem('favoriteUsers', JSON.stringify(newFavorites));

      setLikedUserIds(updatedLiked);
      setFavorites(new Set(newFavorites.map(u => u.login.uuid)));
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  return (
    <div className="team-container">
      <h1>Team Members</h1>

      <div className="filters">
        <label>
          Results per page:
          <select
            value={results}
            onChange={(e) => {
              setResults(Number(e.target.value));
              setPage(1);
              setUsers([]);
            }}
          >
            {[1, 2, 4, 6, 12, 24, 48, 100].map(val => (
              <option key={val} value={val}>{val}</option>
            ))}
          </select>
        </label>
        <button onClick={() => setPage(prev => prev + 1)} disabled={loading}>
          {loading ? 'Loading...' : 'Load More'}
        </button>
      </div>

      <div className="users-grid">
        {users.map(user => {
          const id = user.login.uuid;
          return (
            <div key={id} className="user-card">
              <img src={user.picture.medium} alt={user.name.first} />
              <h3>{`${user.name.first} ${user.name.last}`}</h3>
              <p>{user.email}</p>
              <div className="user-actions">
                <button
                  onClick={() => handleLike(id)}
                  className={`like-button ${favorites.has(id) ? 'favorited' : likedUserIds.has(id) ? 'liked' : ''}`}
                >
                  {favorites.has(id) ? '⭐️' : likedUserIds.has(id) ? '❤️' : '♡'}
                </button>
                <Link to={`/team/${id}`} state={{ user }}>
                  View Profile
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Team;
