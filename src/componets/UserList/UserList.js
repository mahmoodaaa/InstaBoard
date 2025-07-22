import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from '../UserCard/UserCard';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://randomuser.me/api/?results=12&page=${page}`);
      const newUsers = response.data.results.map(user => ({
        picture: user.picture.large,
        name: `${user.name.first} ${user.name.last}`,
        email: user.email
      }));
      setUsers(prevUsers => [...prevUsers, ...newUsers]);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <button 
          onClick={toggleDarkMode}
          className="theme-toggle"
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>
      
      <div className="user-grid">
        {filteredUsers.map((user, index) => (
          <UserCard
            key={index}
            picture={user.picture}
            name={user.name}
            email={user.email}
          />
        ))}
      </div>
      <button 
        onClick={fetchUsers}
        disabled={loading}
        className="load-more-btn"
      >
        {loading ? 'Loading...' : 'Load More'}
      </button>
    </div>
  );
};

export default UserList;