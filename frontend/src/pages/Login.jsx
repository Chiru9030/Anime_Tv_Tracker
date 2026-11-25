import React, { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const API_URL = import.meta.env.VITE_API_URL;

  const handleAuth = async (isRegister) => {
    const endpoint = isRegister ? 'register' : 'login';
    try {
      const body = isRegister ? { name, email, password } : { email, password };
      const res = await axios.post(`${API_URL}/api/auth/${endpoint}`, body);

      localStorage.setItem('token', res.data.token); 
      alert(`Successfully ${isRegister ? 'Registered and Logged in' : 'Logged in'} as ${res.data.user.name}`);
      window.location.href = '/'; 
    } catch (err) {
      alert('Authentication failed: ' + (err.response?.data?.msg || 'Check server/credentials'));
    }
  };

  return (
    <div>
      <h2>User Authentication</h2>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
        <input placeholder="Full Name (Register only)" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="button" onClick={() => handleAuth(false)}>Log In</button>
        <button type="button" onClick={() => handleAuth(true)}>Register</button>
      </form>
    </div>
  );
}