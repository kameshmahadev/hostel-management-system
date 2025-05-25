// pages/Profile.js
import React, { useState, useEffect } from 'react';
import api from '../service/api';

const Profile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await api.get('/users/me');
      setUser(res.data);
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put('/users/me', user);
    alert('Profile updated successfully');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={user.name || ''} onChange={handleChange} />
      <input name="email" value={user.email || ''} onChange={handleChange} />
      {/* Add other fields as necessary */}
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default Profile;
