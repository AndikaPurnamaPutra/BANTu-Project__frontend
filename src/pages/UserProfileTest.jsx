import React, { useEffect, useState } from 'react';
import { getProfile } from '../services/userService';

export default function UserProfileTest() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const backendUrl = import.meta.env.VITE_API_BASE_URL.replace('/api', '');

  useEffect(() => {
    getProfile()
      .then(res => setUser(res.data))
      .catch(err => {
        console.error(err);
        setError('Failed to load profile. Please login first.');
      });
  }, []);

  if (error) return <div>{error}</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>User Profile Test</h2>
      <p><b>Name:</b> {user.firstName}</p>
      <p><b>Username:</b> {user.username}</p>
      <p><b>Email:</b> {user.email}</p>
      <img src={`${backendUrl}${user.profilePic}`} alt="Profile" width="150" />
    </div>
  );
}
