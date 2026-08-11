import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  // User jo bhi type karega, wo yahan save hoga
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  
  // Success ya Error message dikhane ke liye
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  
  const navigate = useNavigate(); // Page change karne ke liye

  // Jab user form mein kuch type karega
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Jab user "Register" button par click karega
  const handleSubmit = async (e) => {
    e.preventDefault(); // Page ko reload hone se rokna
    try {
      // Backend ke Register API ko data bhejna
      const response = await axios.post('https://placement-portal-yq2h.onrender.com/api/auth/register', formData);
      
      setMessage(response.data.message);
      setIsError(false);
      
      // 2 second baad user ko automatically Login page par bhej dena
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed!');
      setIsError(true);
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-6 col-lg-4">
        <div className="card shadow border-0">
          <div className="card-body p-4">
            <h3 className="text-center mb-4 fw-bold">Create Account</h3>
            
            {/* Message dikhane ka alert box */}
            {message && (
              <div className={`alert ${isError ? 'alert-danger' : 'alert-success'}`} role="alert">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  placeholder="Rahul Kumar"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input 
                  type="email" 
                  className="form-control" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  placeholder="name@example.com"
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  required 
                  placeholder="Min 6 characters"
                />
              </div>

              <button type="submit" className="btn btn-primary w-100 fw-bold">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;