import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState(''); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(''); 
    
    try {
        const API_BASE = window.location.hostname === 'localhost' 
            ? 'https://placement-portal-yq2h.onrender.com' 
            : 'https://placement-portal-9mz5.onrender.com';

        const endpoint = isLogin ? `${API_BASE}/api/auth/login` : `${API_BASE}/api/auth/register`;
        
        const res = await axios.post(endpoint, formData);
        
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userId', res.data.user.id); 
        localStorage.setItem('user', JSON.stringify(res.data.user));
        
        navigate('/');
    } catch (err) {
        setErrorMsg(err.response?.data?.msg || err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-vh-100 bg-dark d-flex flex-column align-items-center justify-content-center p-4">
      <h2 className="text-white mb-4">{isLogin ? 'Welcome Back!' : 'Start Your Journey'}</h2>
      {errorMsg && <div className="alert alert-danger py-2">{errorMsg}</div>}
      <form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: '400px' }}>
        {!isLogin && <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control mb-3" placeholder="Full Name" required />}
        <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control mb-3" placeholder="Email" required />
        <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control mb-3" placeholder="Password" required />
        <button type="submit" className="btn btn-warning w-100 fw-bold">{isLogin ? 'Log In' : 'Sign Up'}</button>
      </form>
    </div>
  );
};

export default AuthPage;