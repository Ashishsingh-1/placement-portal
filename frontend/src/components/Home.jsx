import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  
  const [isLogin, setIsLogin] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  
  const [appTheme, setAppTheme] = useState('dark');
  
  const cardRef = useRef(null);
  const [cursorPos, setCursorPos] = useState({ x: -1000, y: -1000 });

  // 🧠 AUTO-THEME DETECTOR
  useEffect(() => {
    const detectTheme = () => {
        let bodyBg = window.getComputedStyle(document.body).backgroundColor;
        let htmlBg = window.getComputedStyle(document.documentElement).backgroundColor;
        let colorToEval = (bodyBg !== 'rgba(0, 0, 0, 0)' && bodyBg !== 'transparent') ? bodyBg : htmlBg;
        
        const match = colorToEval.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (match) {
            const r = parseInt(match[1]);
            const g = parseInt(match[2]);
            const b = parseInt(match[3]);
            const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
            setAppTheme(hsp > 127.5 ? 'light' : 'dark');
        } else {
            if (document.body.className.includes('light') || document.documentElement.className.includes('light')) {
                setAppTheme('light');
            } else {
                setAppTheme('dark');
            }
        }
    };

    detectTheme();
    const observer = new MutationObserver(detectTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class', 'style', 'data-theme'] });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style', 'data-theme', 'data-bs-theme'] });

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setCursorPos({ x: -1000, y: -1000 });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔗 DYNAMIC API ENDPOINT (Auto detects Localhost vs Render Backend)
  const handleAuth = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }
    
    setIsSubmitting(true);
    try {
        const API_BASE = window.location.hostname === 'localhost' 
            ? 'https://placement-portal-yq2h.onrender.com' 
            : 'https://placement-portal-9mz5.onrender.com';

        const endpoint = isLogin 
            ? `${API_BASE}/api/auth/login` 
            : `${API_BASE}/api/auth/register`;
        
        const res = await axios.post(endpoint, formData);
        
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userId', res.data.user.id); 
        localStorage.setItem('user', JSON.stringify(res.data.user));
        
        navigate('/dashboard'); 
    } catch (err) {
        setErrorMsg(err.response?.data?.msg || err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className={`premium-wrapper min-vh-100 d-flex align-items-center position-relative ${appTheme === 'light' ? 'theme-light' : 'theme-dark'}`}>
      
      {/* ✨ AMBIENT GLOW & MESH BACKGROUND ✨ */}
      <div className="ambient-mesh"></div>
      <div className="ambient-orb orb-primary"></div>
      <div className="ambient-orb orb-secondary"></div>

      <div className="container-xl position-relative z-1 py-5">
        <div className="row align-items-center justify-content-between gy-5">
          
          {/* ================= LEFT: ORIGINAL HERO CONTENT ================= */}
          <div className="col-lg-6 col-xl-6 text-center text-lg-start pe-lg-5 animate-slide-up">
            
            <div className="d-flex justify-content-center justify-content-lg-start mb-3">
                <div className="status-badge px-3 py-2 rounded-pill d-inline-flex align-items-center gap-2 shadow-sm">
                    <span className="status-dot"></span>
                    <span className="fw-medium theme-text-muted" style={{ fontSize: '12.5px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>System V2.0 Operational</span>
                </div>
            </div>

            <h1 className="fw-bolder mb-4 hero-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', letterSpacing: '-1.5px', lineHeight: '1.1' }}>
              Your Complete <br className="d-none d-lg-block" />
              <span className="theme-gradient-text">Career Engine.</span>
            </h1>

            <p className="theme-text-muted mb-5 mx-auto mx-lg-0 fs-5" style={{ maxWidth: '540px', lineHeight: '1.6' }}>
              Analyze your resume, explore a vast technical question bank, simulate real-time AI interviews, and get FAANG-level performance reports all in one unified workspace.
            </p>

            <div className="d-flex justify-content-center justify-content-lg-start mb-5">
                <button 
                  onClick={() => navigate('/prepare')} 
                  className="btn-explore d-flex align-items-center gap-2 px-4 py-3 rounded-4 shadow-sm"
                >
                  <i className="bi bi-stack theme-icon-active"></i>
                  <span>Explore Question Database</span>
                </button>
            </div>

            <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start theme-text-muted fw-medium" style={{ fontSize: '14px' }}>
                <div className="feature-pill"><i className="bi bi-file-earmark-text theme-icon"></i> Resume Parsing</div>
                <div className="feature-pill"><i className="bi bi-mic theme-icon"></i> AI Simulations</div>
                <div className="feature-pill"><i className="bi bi-pie-chart theme-icon"></i> Deep Reports</div>
            </div>
          </div>

          {/* ================= RIGHT: PREMIUM GLASS CARD (LOGIN / REGISTER) ================= */}
          <div className="col-lg-6 col-xl-5 mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div 
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="glass-auth-card p-4 p-md-5 rounded-4 position-relative overflow-hidden"
            >
                {/* Spotlight effect follows mouse */}
                <div 
                  className="card-spotlight" 
                  style={{ background: `radial-gradient(600px circle at ${cursorPos.x}px ${cursorPos.y}px, var(--spotlight-color), transparent 40%)` }}
                />
                
                <div className="position-relative z-1">
                    <div className="mb-4 text-center text-lg-start">
                        <h3 className="fw-bolder mb-2 theme-text-main tracking-tight">{isLogin ? 'Workspace Access' : 'Initialize Account'}</h3>
                        <p className="theme-text-muted" style={{ fontSize: '14.5px' }}>
                            {isLogin ? 'Log in to access your dashboard and reports.' : 'Join to unlock the complete preparation suite.'}
                        </p>
                    </div>
                    
                    {/* Error Message Alert */}
                    {errorMsg && (
                      <div className="alert alert-danger py-2 mb-3 text-center" style={{ fontSize: '13.5px' }}>
                        {errorMsg}
                      </div>
                    )}

                    {/* Social Auth */}
                    <div className="d-flex gap-3 mb-4 flex-column flex-sm-row">
                        <button className="btn social-btn flex-grow-1 py-2 shadow-sm" type="button">
                            <i className="bi bi-google text-danger"></i> <span className="fw-medium">Google</span>
                        </button>
                        <button className="btn social-btn flex-grow-1 py-2 shadow-sm" type="button">
                            <i className="bi bi-github theme-text-main"></i> <span className="fw-medium">GitHub</span>
                        </button>
                    </div>

                    <div className="d-flex align-items-center gap-3 mb-4">
                        <div className="divider-line flex-grow-1"></div>
                        <span className="theme-text-muted text-uppercase fw-semibold" style={{ fontSize: '10px', letterSpacing: '1px' }}>Or Standard Email</span>
                        <div className="divider-line flex-grow-1"></div>
                    </div>

                    {/* Secure Form connected to Backend */}
                    <form onSubmit={handleAuth}>
                        {!isLogin && (
                            <div className="input-group-custom mb-3">
                                <i className="bi bi-person input-icon"></i>
                                <input 
                                    type="text" name="name" className="form-control premium-input" 
                                    placeholder="Full Name" value={formData.name} onChange={handleInputChange} required={!isLogin}
                                />
                            </div>
                        )}
                        
                        <div className="input-group-custom mb-3">
                            <i className="bi bi-envelope input-icon"></i>
                            <input 
                                type="email" name="email" className="form-control premium-input" 
                                placeholder="Email Address" value={formData.email} onChange={handleInputChange} required 
                            />
                        </div>

                        <div className="input-group-custom mb-4">
                            <i className="bi bi-lock input-icon"></i>
                            <input 
                                type="password" name="password" className="form-control premium-input" 
                                placeholder="Password" value={formData.password} onChange={handleInputChange} required 
                            />
                        </div>

                        <button type="submit" className="btn submit-btn w-100 fw-bold d-flex justify-content-center align-items-center shadow-sm" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <div className="spinner-border spinner-border-sm theme-spinner" role="status"></div>
                            ) : (
                                <span>{isLogin ? 'Enter Workspace' : 'Create Profile'}</span>
                            )}
                        </button>
                    </form>

                    {/* Footer Link */}
                    <div className="text-center mt-4 pt-2">
                        <span className="theme-text-muted" style={{ fontSize: '14px' }}>
                            {isLogin ? "Need a new workspace? " : "Already established? "}
                            <span 
                                className="fw-semibold ms-1 toggle-link theme-text-main"
                                onClick={() => { setIsLogin(!isLogin); setFormData({ name: '', email: '', password: '' }); setErrorMsg(''); }}
                            >
                                {isLogin ? 'Sign Up' : 'Sign In'}
                            </span>
                        </span>
                    </div>
                </div>
            </div>
          </div>

        </div>
      </div>

      {/* 🎨 THEME-AWARE PREMIUM CSS */}
      <style>{`
        .premium-wrapper {
            background-color: transparent; 
            font-family: -apple-system, BlinkMacSystemFont, "Inter", sans-serif;
            overflow-x: hidden;
            transition: color 0.4s ease;
        }

        .premium-wrapper.theme-dark {
            --text-main: #ffffff;
            --text-muted: #a1a1aa;
            --gradient-start: #ffffff;
            --gradient-end: #71717a;
            --glass-bg: rgba(20, 20, 22, 0.6);
            --glass-border: rgba(255, 255, 255, 0.08);
            --glass-shadow: 0 30px 60px rgba(0, 0, 0, 0.8);
            --input-bg: rgba(255, 255, 255, 0.03);
            --input-border: rgba(255, 255, 255, 0.1);
            --input-focus: rgba(255, 255, 255, 0.25);
            --btn-primary-bg: #ffffff;
            --btn-primary-text: #000000;
            --btn-primary-hover: #e4e4e7;
            --btn-sec-bg: rgba(255, 255, 255, 0.05);
            --btn-sec-hover: rgba(255, 255, 255, 0.1);
            --btn-sec-border: rgba(255, 255, 255, 0.1);
            --mesh-color: rgba(255, 255, 255, 0.05);
            --orb-primary: rgba(59, 130, 246, 0.15);
            --orb-secondary: rgba(168, 85, 247, 0.1);
            --icon-color: #a1a1aa;
            --icon-active: #ffffff;
            --divider: rgba(255, 255, 255, 0.1);
            --spotlight-color: rgba(255, 255, 255, 0.05);
        }

        .premium-wrapper.theme-light {
            --text-main: #0f172a;
            --text-muted: #64748b;
            --gradient-start: #0f172a;
            --gradient-end: #94a3b8;
            --glass-bg: rgba(255, 255, 255, 0.7);
            --glass-border: rgba(0, 0, 0, 0.08);
            --glass-shadow: 0 30px 60px rgba(0, 0, 0, 0.05);
            --input-bg: rgba(0, 0, 0, 0.02);
            --input-border: rgba(0, 0, 0, 0.1);
            --input-focus: rgba(59, 130, 246, 0.4);
            --btn-primary-bg: #0f172a;
            --btn-primary-text: #ffffff;
            --btn-primary-hover: #1e293b;
            --btn-sec-bg: rgba(0, 0, 0, 0.03);
            --btn-sec-hover: rgba(0, 0, 0, 0.06);
            --btn-sec-border: rgba(0, 0, 0, 0.1);
            --mesh-color: rgba(0, 0, 0, 0.03);
            --orb-primary: rgba(59, 130, 246, 0.1);
            --orb-secondary: rgba(168, 85, 247, 0.08);
            --icon-color: #64748b;
            --icon-active: #0f172a;
            --divider: rgba(0, 0, 0, 0.1);
            --spotlight-color: rgba(0, 0, 0, 0.02);
        }

        .theme-text-main { color: var(--text-main) !important; transition: color 0.3s; }
        .theme-text-muted { color: var(--text-muted) !important; transition: color 0.3s; }
        .theme-icon { color: var(--icon-color) !important; transition: color 0.3s; }
        .theme-icon-active { color: var(--icon-active) !important; transition: color 0.3s; }
        .theme-spinner { color: var(--btn-primary-text) !important; }
        .tracking-tight { letter-spacing: -0.03em; }

        .theme-gradient-text {
            background: linear-gradient(135deg, var(--gradient-start) 0%, var(--gradient-end) 100%);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent;
            transition: background 0.3s;
        }

        .ambient-mesh {
            position: absolute; top: 0; left: 0; right: 0; bottom: 0;
            background-image: radial-gradient(var(--mesh-color) 1px, transparent 1px);
            background-size: 40px 40px;
            mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%);
            -webkit-mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%);
            z-index: 0; pointer-events: none;
            transition: background-image 0.4s;
        }
        
        .ambient-orb {
            position: absolute; border-radius: 50%; filter: blur(100px); z-index: 0;
            pointer-events: none; transition: background 0.4s ease;
        }
        .orb-primary { top: -10%; left: -10%; width: 50vw; height: 50vw; background: var(--orb-primary); }
        .orb-secondary { bottom: -10%; right: -10%; width: 40vw; height: 40vw; background: var(--orb-secondary); }

        .status-badge {
            background: var(--btn-sec-bg);
            border: 1px solid var(--btn-sec-border);
            backdrop-filter: blur(8px);
        }
        .status-dot {
            width: 8px; height: 8px; border-radius: 50%;
            background-color: #10B981;
            box-shadow: 0 0 10px rgba(16, 185, 129, 0.6);
            animation: pulseGreen 2s infinite;
        }
        @keyframes pulseGreen { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.6; transform: scale(0.85); } }

        .feature-pill {
            display: flex; align-items: center; gap: 8px;
            padding: 6px 14px; border-radius: 8px;
            background: var(--btn-sec-bg); border: 1px solid var(--glass-border);
            transition: all 0.3s;
        }

        .btn-explore {
            background: var(--btn-sec-bg);
            color: var(--text-main);
            border: 1px solid var(--btn-sec-border);
            font-weight: 600; font-size: 15px;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            backdrop-filter: blur(8px);
        }
        .btn-explore:hover { background: var(--btn-sec-hover); transform: translateY(-2px); }
        .btn-explore:active { transform: scale(0.97); }

        .glass-auth-card {
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            box-shadow: var(--glass-shadow);
            backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
            width: 100%; max-width: 500px;
            transition: all 0.4s ease;
        }
        .card-spotlight {
            position: absolute; top: 0; left: 0; right: 0; bottom: 0;
            pointer-events: none; z-index: 0; transition: background 0.1s ease;
        }

        .social-btn {
            background-color: var(--btn-sec-bg);
            border: 1px solid var(--btn-sec-border);
            color: var(--text-main);
            font-size: 14.5px;
            display: flex; align-items: center; justify-content: center; gap: 8px;
            transition: all 0.2s ease;
        }
        .social-btn:hover { background-color: var(--btn-sec-hover); transform: translateY(-1px); }
        .social-btn:active { transform: scale(0.97); }
        
        .divider-line { height: 1px; background-color: var(--divider); transition: background-color 0.3s; }

        .input-group-custom { position: relative; }
        .input-icon {
            position: absolute; left: 16px; top: 50%; transform: translateY(-50%);
            color: var(--text-muted); font-size: 18px; transition: color 0.2s;
        }
        .premium-input {
            width: 100%; height: 52px;
            background-color: var(--input-bg) !important;
            border: 1px solid var(--input-border) !important;
            border-radius: 12px !important;
            color: var(--text-main) !important;
            padding: 0 16px 0 46px !important;
            font-size: 15px;
            box-shadow: none !important;
            transition: all 0.2s ease;
        }
        .premium-input::placeholder { color: var(--text-muted); opacity: 0.7; }
        .premium-input:focus {
            background-color: var(--glass-bg) !important;
            border-color: var(--input-focus) !important;
            box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1) !important;
        }
        .premium-input:focus + .input-icon, .input-group-custom:focus-within .input-icon { color: var(--text-main); }

        .submit-btn {
            background-color: var(--btn-primary-bg);
            color: var(--btn-primary-text);
            height: 52px; border-radius: 12px;
            font-size: 15px; border: none;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .submit-btn:hover { background-color: var(--btn-primary-hover); transform: translateY(-1px); }
        .submit-btn:active { transform: scale(0.97); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

        .toggle-link { cursor: pointer; text-decoration: underline; text-underline-offset: 4px; transition: opacity 0.2s; }
        .toggle-link:hover { opacity: 0.7; }

        .animate-slide-up { animation: slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; transform: translateY(20px); }
        @keyframes slideUpFade { to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 991px) {
            .premium-wrapper { padding: 3rem 0; }
            .ambient-orb { filter: blur(70px); }
        }
        @media (max-width: 576px) {
            .glass-auth-card { padding: 2rem 1.5rem !important; border-radius: 20px; }
            .premium-input, .submit-btn { height: 48px; font-size: 14.5px; }
            .hero-title { font-size: 2.2rem !important; }
        }
      `}</style>
    </div>
  );
};

export default Home;