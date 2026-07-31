import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  // Dropdown & Auth States
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 💡 MOCK AUTH STATE (Backend lagane ke baad isko update kar lena)
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userName = localStorage.getItem('userName') || "User";

  // Theme Applier Effect
  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? '#000000' : '#f9fafb';
    document.body.style.color = isDarkMode ? '#ffffff' : '#1f2937';
  }, [isDarkMode]);

  // Handle Clicking Outside to close Dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    window.dispatchEvent(new Event('theme-change')); 
  };

  // Auth Handlers
  const handleLoginRedirect = () => {
    setIsDropdownOpen(false);
    navigate('/'); // Redirect to Home/Login Page
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    setIsDropdownOpen(false);
    navigate('/');
  };

  return (
    <>
      <nav className={`navbar navbar-expand-lg py-1 ${isDarkMode ? 'navbar-dark' : 'navbar-light'}`} 
           style={{ 
             backgroundColor: isDarkMode ? '#000000' : '#f9fafb',
             borderBottom: `1px solid ${isDarkMode ? '#262626' : '#e5e7eb'}`,
             transition: 'all 0.3s ease'
           }}>
        <div className="container-fluid px-4">
          
          <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
            <div className="bg-primary rounded text-white d-flex justify-content-center align-items-center" style={{ width: '28px', height: '28px' }}>
              <i className="bi bi-shield-lock-fill fs-6"></i>
            </div>
            <span style={{ color: isDarkMode ? '#ffffff' : '#1f2937', letterSpacing: '0.5px' }}>PrepForge</span>
          </Link>
          
          <div className="ms-auto d-flex align-items-center gap-3">
            
            {/* THEME TOGGLE BUTTON */}
            <button 
              onClick={toggleTheme}
              className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center shadow-sm"
              style={{ 
                width: '35px', height: '35px', 
                backgroundColor: isDarkMode ? '#171717' : '#ffffff', 
                color: isDarkMode ? '#f59e0b' : '#3b82f6', 
                border: `1px solid ${isDarkMode ? '#262626' : '#e5e7eb'}` 
              }}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              <i className={`bi fs-5 ${isDarkMode ? 'bi-sun-fill' : 'bi-moon-stars-fill'}`}></i>
            </button>

            {/* PROFILE / AUTH SECTION */}
            <div className="position-relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center shadow-sm" 
                  style={{ 
                    width: '35px', height: '35px', 
                    backgroundColor: isDarkMode ? '#171717' : '#ffffff', 
                    color: isDarkMode ? '#ffffff' : '#1f2937', 
                    border: `1px solid ${isDarkMode ? '#262626' : '#e5e7eb'}`,
                    transition: 'all 0.2s'
                  }}>
                  {isLoggedIn ? (
                      <span className="fw-bold" style={{ fontSize: '14px' }}>{userName.charAt(0).toUpperCase()}</span>
                  ) : (
                      <i className="bi bi-person-fill fs-5"></i>
                  )}
                </button>

                {/* DROPDOWN MENU */}
                {isDropdownOpen && (
                  <div 
                    className="position-absolute shadow-lg rounded-3 overflow-hidden custom-dropdown-menu"
                    style={{
                        top: '45px', 
                        right: '0', 
                        width: '240px',
                        backgroundColor: isDarkMode ? '#171717' : '#ffffff',
                        border: `1px solid ${isDarkMode ? '#262626' : '#e5e7eb'}`,
                        zIndex: 1000
                    }}
                  >
                    {isLoggedIn ? (
                        /* LOGGED IN MENU */
                        <>
                            <div className="p-3 border-bottom" style={{ borderColor: isDarkMode ? '#262626' : '#e5e7eb' }}>
                                <span className="d-block fw-bold" style={{ color: isDarkMode ? '#ffffff' : '#1f2937' }}>{userName}</span>
                                <small style={{ color: isDarkMode ? '#a3a3a3' : '#6b7280' }}>Active Account</small>
                            </div>
                            <div className="py-2">
                                <button onClick={() => { setIsDropdownOpen(false); navigate('/dashboard'); }} className={`dropdown-item py-2 d-flex align-items-center gap-2 ${isDarkMode ? 'text-light custom-hover-dark' : 'text-dark custom-hover-light'}`}>
                                    <i className="bi bi-grid-1x2"></i> Dashboard
                                </button>
                                <button onClick={handleLogout} className={`dropdown-item py-2 d-flex align-items-center gap-2 text-danger ${isDarkMode ? 'custom-hover-dark' : 'custom-hover-light'}`}>
                                    <i className="bi bi-box-arrow-right"></i> Log Out
                                </button>
                            </div>
                        </>
                    ) : (
                        /* GUEST MENU */
                        <div className="p-4 text-center">
                            <i className="bi bi-shield-lock text-primary mb-2" style={{ fontSize: '30px' }}></i>
                            <h6 className="fw-bold mt-2" style={{ color: isDarkMode ? '#ffffff' : '#1f2937' }}>Not Logged In</h6>
                            <p className="small mb-3" style={{ color: isDarkMode ? '#a3a3a3' : '#6b7280' }}>
                                Please sign in to access your dashboard.
                            </p>
                            <button onClick={handleLoginRedirect} className="btn btn-primary btn-sm w-100 rounded-pill fw-semibold shadow-sm">
                                Login / Sign Up
                            </button>
                        </div>
                    )}
                  </div>
                )}
            </div>

          </div>
        </div>
      </nav>

      {/* STYLES FOR DROPDOWN HOVER */}
      <style>{`
        .custom-dropdown-menu {
            animation: dropFadeIn 0.2s ease-out;
        }
        .custom-hover-dark:hover {
            background-color: rgba(255, 255, 255, 0.1) !important;
        }
        .custom-hover-light:hover {
            background-color: rgba(0, 0, 0, 0.05) !important;
        }
        @keyframes dropFadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

export default Navbar;