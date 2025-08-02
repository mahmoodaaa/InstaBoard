import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import UserCard from '../UserCard/UserCard';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navigate = useNavigate();

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://randomuser.me/api/?results=12&page=${page}`);
      const data = await response.json();
      
      const newUsers = data.results.map(user => ({
        picture: user.picture.large,
        name: `${user.name.first} ${user.name.last}`,
        email: user.email,
        joined: user.registered.date,
        role: 'User'
      }));

      setUsers(prevUsers => [...prevUsers, ...newUsers]);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([{
        name: 'Error loading users',
        email: 'Please try again later',
        picture: 'https://via.placeholder.com/150'
      }]);
    } finally {
      setLoading(false);
    }
  }, [page, setUsers, setPage]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      </div>
      
      <div className="user-grid">
        {filteredUsers.map((user, index) => (
          <UserCard
            key={index}
            user={user}
            onClick={() => navigate(`/user/${index}`)}
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