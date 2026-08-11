import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, Tooltip } from 'recharts';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  
  // States for all 3 modules
  const [mockTests, setMockTests] = useState([]);
  const [aiInterviews, setAiInterviews] = useState([]);
  const [questionBankData, setQuestionBankData] = useState({}); 
  
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const handleThemeChange = () => setIsDarkMode(localStorage.getItem('theme') === 'dark');
    window.addEventListener('theme-change', handleThemeChange);
    return () => window.removeEventListener('theme-change', handleThemeChange);
  }, []);

  useEffect(() => {
    if (!userId) {
      navigate('/');
      return;
    }
    
    const userStr = localStorage.getItem('user');
    setUser(userStr ? JSON.parse(userStr) : { name: "User" });

    const fetchAllData = async () => {
      try {
        const API_BASE = window.location.hostname === 'localhost' 
            ? 'https://placement-portal-yq2h.onrender.com' 
            : 'https://placement-portal-9mz5.onrender.com';

        const [quizRes, aiRes, qBankRes] = await Promise.allSettled([
          axios.get(`${API_BASE}/api/results/${userId}`), 
          axios.get(`${API_BASE}/api/ai-interviews/${userId}`), 
          axios.get(`${API_BASE}/api/question-practice/${userId}`) 
        ]);

        // Safely extract arrays or objects
        if (quizRes.status === 'fulfilled') {
            setMockTests(Array.isArray(quizRes.value.data) ? quizRes.value.data : (quizRes.value.data.results || []));
        }
        if (aiRes.status === 'fulfilled') {
            setAiInterviews(Array.isArray(aiRes.value.data) ? aiRes.value.data : (aiRes.value.data.interviews || []));
        }
        if (qBankRes.status === 'fulfilled') {
            setQuestionBankData(qBankRes.value.data || {});
        }

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [userId, navigate]);

  const theme = {
    bg: isDarkMode ? '#0f172a' : '#f8fafc',             
    text: isDarkMode ? '#f8fafc' : '#0f172a',           
    sidebarBg: isDarkMode ? '#111827' : '#ffffff',      
    cardBg: isDarkMode ? '#1e293b' : '#ffffff',         
    cardBorder: isDarkMode ? '#334155' : '#e2e8f0',     
    textMuted: isDarkMode ? '#94a3b8' : '#64748b',      
    inputBg: isDarkMode ? '#0f172a' : '#f1f5f9',        
    inputBorder: isDarkMode ? '#334155' : '#cbd5e1'
  };

  const styles = { card: { backgroundColor: theme.cardBg, color: theme.text, borderRadius: '16px', border: `1px solid ${theme.cardBorder}`, transition: 'all 0.3s ease' } };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: theme.bg }}>
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  // =========================================================================
  // 🧠 BULLETPROOF UNIFIED DATA NORMALIZER (Merges ALL 3 Modules)
  // =========================================================================
  
  let allActivities = [];

  // 1. Process Mock Tests
  if (Array.isArray(mockTests)) {
      mockTests.forEach(r => {
          allActivities.push({
              displayType: 'Mock Test',
              category: r.category || r.topic || 'General Mock',
              date: new Date(r.attemptedAt || r.createdAt || Date.now()),
              score: Number(r.score || r.correctAnswers || 0),
              total: Number(r.totalQuestions || 1)
          });
      });
  }

  // 2. Process AI Interviews (Normalizing score to base 100)
  if (Array.isArray(aiInterviews)) {
      aiInterviews.forEach(a => {
          allActivities.push({
              displayType: 'AI Interview',
              category: a.category || a.jobRole || a.topic || 'AI Technical',
              date: new Date(a.attemptedAt || a.createdAt || Date.now()),
              score: Number(a.score || a.overallScore || a.rating || 0), 
              total: 100 
          });
      });
  }

  // 3. Process Question Bank
  if (Array.isArray(questionBankData) && questionBankData.length > 0) {
      questionBankData.forEach(q => {
          allActivities.push({
              displayType: 'Question Bank',
              category: q.category || q.topic || 'Practice',
              date: new Date(q.createdAt || q.attemptedAt || Date.now()),
              score: Number(q.correctAnswers || q.score || 0),
              total: Number(q.totalQuestions || q.attempted || 1)
          });
      });
  } else if (questionBankData && typeof questionBankData === 'object' && questionBankData.solvedCount > 0) {
      // If it returns { solvedCount: X }
      allActivities.push({
          displayType: 'Question Bank',
          category: 'Daily Practice',
          date: new Date(), 
          score: Number(questionBankData.solvedCount),
          total: Number(questionBankData.solvedCount)
      });
  }

  // Add Accuracy % to each mapped activity safely
  allActivities = allActivities.map(item => ({
      ...item,
      acc: item.total > 0 ? (item.score / item.total) * 100 : 0
  }));

  // Clean invalid dates and sort Newest First
  allActivities = allActivities.filter(a => !isNaN(a.date.getTime())).sort((a, b) => b.date - a.date);


  // 📊 CALCULATE AGGREGATE METRICS FOR UI
  let totalQuestionsAttempted = 0;
  let totalCorrectAnswers = 0;
  
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekActivityMap = { 'Mon': 0, 'Tue': 0, 'Wed': 0, 'Thu': 0, 'Fri': 0, 'Sat': 0, 'Sun': 0 };
  const topicStats = {};
  const today = new Date();

  allActivities.forEach(item => {
      // Totals
      totalQuestionsAttempted += item.total;
      totalCorrectAnswers += item.score;

      // Weekly Chart
      const diffDays = Math.ceil(Math.abs(today - item.date) / (1000 * 60 * 60 * 24));
      if (diffDays <= 7) {
          weekActivityMap[daysOfWeek[item.date.getDay()]] += item.displayType === 'AI Interview' ? 5 : item.total;
      }

      // Topics Progress
      const cat = item.category;
      if (!topicStats[cat]) topicStats[cat] = { score: 0, total: 0 };
      topicStats[cat].score += item.score;
      topicStats[cat].total += item.total;
  });

  const isInitialPhase = allActivities.length === 0;

  // Pie Chart Data
  const accuratePercent = totalQuestionsAttempted > 0 ? Math.round((totalCorrectAnswers / totalQuestionsAttempted) * 100) : 0;
  const mistakesPercent = totalQuestionsAttempted > 0 ? 100 - accuratePercent : 0;
  
  const pieData = totalQuestionsAttempted > 0 ? [
    { name: 'Correct', value: accuratePercent, color: '#10b981' }, 
    { name: 'Incorrect', value: mistakesPercent, color: '#ef4444' } 
  ] : [
    { name: 'No Data', value: 100, color: theme.cardBorder } 
  ];

  // Trend Area Chart Data (Chronological: Oldest to Newest)
  const trendActivities = [...allActivities].reverse();
  const trendData = trendActivities.length > 0 
      ? trendActivities.map(item => ({ score: Math.round(item.acc) }))
      : [{ score: 0 }];

  // Weekly Bar Chart Data
  const weeklyData = daysOfWeek.slice(1).concat(daysOfWeek.slice(0, 1)).map(day => ({ name: day, activity: weekActivityMap[day] }));

  // Topic Progress Data
  const topicColors = ['#a855f7', '#f97316', '#3b82f6', '#10b981', '#ec4899', '#eab308'];
  const dynamicTopics = Object.keys(topicStats).map((cat, index) => {
    const accuracy = topicStats[cat].total > 0 ? Math.round((topicStats[cat].score / topicStats[cat].total) * 100) : 0;
    return { name: cat, progress: accuracy, color: topicColors[index % topicColors.length] };
  }).sort((a, b) => b.progress - a.progress);

  // Filtered UI Results
  const uniqueDates = new Set(allActivities.map(item => item.date.toLocaleDateString()));
  const activeDays = uniqueDates.size;

  const filteredTopics = dynamicTopics.filter(topic => topic.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredRecent = allActivities.filter(res => (res.category || '').toLowerCase().includes(searchQuery.toLowerCase()) || res.displayType.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div style={{ backgroundColor: theme.bg, color: theme.text, minHeight: '100vh', fontFamily: "'Inter', sans-serif", transition: 'all 0.3s ease' }} className="d-flex">
      
      {/* LEFT SIDEBAR */}
      <div className="d-none d-lg-flex flex-column p-3 border-end" style={{ width: '260px', borderColor: theme.cardBorder, backgroundColor: theme.sidebarBg }}>
        <div className="d-flex flex-column gap-1 overflow-auto mt-2" style={{ flex: 1 }}>
          <Link to="/dashboard" className="p-3 d-flex align-items-center gap-3 rounded-3 text-white fw-bold text-decoration-none shadow-sm" style={{ backgroundColor: '#4f46e5' }}>
            <i className="bi bi-grid-1x2-fill"></i> Dashboard
          </Link>
          <div className="mt-4 mb-2 px-2 text-uppercase fw-bold" style={{ fontSize: '0.7rem', color: theme.textMuted, letterSpacing: '1px' }}>Practice & Test</div>
          <Link to="/prepare" className="p-3 d-flex align-items-center gap-3 rounded-3 text-decoration-none hover-effect" style={{ color: theme.text }}>
            <i className="bi bi-calculator-fill text-primary"></i> Question Bank
          </Link>
          <Link to="/quiz" className="p-3 d-flex align-items-center gap-3 rounded-3 text-decoration-none hover-effect" style={{ color: theme.text }}>
            <i className="bi bi-stopwatch-fill text-warning"></i> Mock Assessments
          </Link>
        </div>
        
        <div className="mt-4 mb-2 px-2 text-uppercase fw-bold" style={{ fontSize: '0.7rem', color: theme.textMuted, letterSpacing: '1px' }}>AI Interface</div>
        <Link to="/interview-selection" className="p-3 mb-4 d-flex align-items-center gap-3 rounded-3 text-decoration-none hover-effect" style={{ color: theme.text }}>
          <i className="bi bi-robot text-danger"></i> AI Interviewer
        </Link>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-grow-1 p-4 p-lg-5 overflow-auto" style={{ height: '100vh' }}>
        
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-4 mb-5">
          <div>
            <h2 className="fw-bold mb-1">Welcome back, {user?.name ? user.name.split(' ')[0] : 'User'}! 👋</h2>
            <p style={{ color: theme.textMuted }} className="mb-0">
              {isInitialPhase ? "You're in your initial preparation phase. Start exploring modules below!" : "Comprehensive performance metrics across Question Bank, AI Interviews, and Mock Tests."}
            </p>
          </div>
          
          <div className="d-flex align-items-center">
            {/* SEARCH BAR */}
            <div className="input-group shadow-sm" style={{ width: '300px' }}>
              <span className="input-group-text border-end-0" style={{ backgroundColor: theme.inputBg, borderColor: theme.inputBorder, color: theme.textMuted }}>
                <i className="bi bi-search"></i>
              </span>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-control border-start-0 shadow-none" 
                placeholder="Search topics or tests..." 
                style={{ backgroundColor: theme.inputBg, borderColor: theme.inputBorder, color: theme.text }} 
              />
            </div>
          </div>
        </div>

        {/* 🔥 INITIAL PHASE BANNER */}
        {isInitialPhase && (
          <div className="alert p-4 mb-4 rounded-4 d-flex align-items-center gap-3 shadow-sm" style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.cardBorder}`, color: theme.text }}>
            <div className="fs-1 text-primary">🚀</div>
            <div>
              <h5 className="fw-bold mb-1">Welcome to your Career Command Center!</h5>
              <p className="mb-2 text-secondary" style={{ fontSize: '0.9rem' }}>
                You haven't attempted any practice sessions or mock interviews yet. Jump into the <b>Question Bank</b> or start an <b>AI Interview</b> to see your analytical metrics come alive.
              </p>
            </div>
          </div>
        )}

        {/* 4 STAT WIDGETS */}
        <div className="row g-4 mb-4">
          <div className="col-md-3">
            <div className="p-4 h-100 d-flex flex-column justify-content-between shadow-sm" style={styles.card}>
              <h6 style={{ color: theme.textMuted }} className="fw-bold mb-3">Overall Accuracy</h6>
              <div className="d-flex align-items-center gap-3">
                <div style={{ width: '80px', height: '80px', position: 'relative' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} innerRadius={28} outerRadius={38} dataKey="value" stroke="none">
                        {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="position-absolute top-50 start-50 translate-middle text-center">
                    <span className="fw-bold" style={{ fontSize: '0.95rem', color: theme.text }}>{totalQuestionsAttempted > 0 ? accuratePercent + '%' : '0%'}</span>
                  </div>
                </div>
                <div style={{ fontSize: '0.8rem', color: theme.text }}>
                  <div className="mb-1"><span style={{ color: '#10b981' }}>●</span> Correct</div>
                  <div><span style={{ color: '#ef4444' }}>●</span> Incorrect</div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="p-4 h-100 d-flex flex-column justify-content-between shadow-sm" style={styles.card}>
              <h6 style={{ color: theme.textMuted }} className="fw-bold">Total Workload Base</h6>
              <div>
                <h2 className="fw-bold mb-2">{totalQuestionsAttempted} <span className="fs-5 fw-normal text-muted">Pts</span></h2>
                <div className="d-flex justify-content-between align-items-end">
                  <span className="text-success" style={{ fontSize: '0.8rem' }}><i className="bi bi-check-circle-fill me-1"></i>Combined</span>
                  <div style={{ width: '70px', height: '35px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={trendData}>
                        <defs><linearGradient id="colorQ" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient></defs>
                        <Area type="monotone" dataKey="score" stroke="#10b981" fillOpacity={1} fill="url(#colorQ)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="p-4 h-100 d-flex flex-column justify-content-between shadow-sm" style={styles.card}>
              <h6 style={{ color: theme.textMuted }} className="fw-bold">Interviews & Mock Tests</h6>
              <div>
                <h2 className="fw-bold mb-2">{(mockTests?.length || 0) + (aiInterviews?.length || 0)}</h2>
                <div className="d-flex justify-content-between align-items-end">
                  <span style={{ fontSize: '0.8rem', color: '#38bdf8' }}>{aiInterviews?.length || 0} AI / {mockTests?.length || 0} Mock</span>
                  <div style={{ width: '70px', height: '35px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={trendData}>
                        <defs><linearGradient id="colorS" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#a855f7" stopOpacity={0.4}/><stop offset="95%" stopColor="#a855f7" stopOpacity={0}/></linearGradient></defs>
                        <Area type="monotone" dataKey="score" stroke="#a855f7" fillOpacity={1} fill="url(#colorS)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="p-4 h-100 d-flex justify-content-between align-items-center shadow-sm position-relative overflow-hidden" style={styles.card}>
              <div>
                <h6 style={{ color: theme.textMuted }} className="fw-bold">Total Sessions Recorded</h6>
                <h2 className="fw-bold mb-2">{allActivities.length} <span style={{ color: theme.textMuted }} className="fs-5 fw-normal">Sessions</span></h2>
                <span className="text-warning" style={{ fontSize: '0.85rem' }}>🔥 {isInitialPhase ? 'Start your journey!' : 'Consistent Grind!'}</span>
              </div>
              <div className="position-absolute" style={{ right: '-15px', bottom: '-15px', fontSize: '5rem', opacity: isDarkMode ? '0.8' : '0.4' }}>🔥</div>
            </div>
          </div>
        </div>

        {/* MIDDLE BLOCKS */}
        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <div className="p-4 h-100 shadow-sm" style={styles.card}>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h6 className="fw-bold mb-0">Topic Wise Accuracy</h6>
              </div>
              <div className="d-flex flex-column gap-3 overflow-auto" style={{ maxHeight: '250px' }}>
                {filteredTopics.length === 0 ? (
                  <p style={{ color: theme.textMuted }} className="text-center mt-4">No data recorded yet.</p>
                ) : (
                  filteredTopics.map((t, i) => (
                    <div key={i} className="d-flex align-items-center justify-content-between">
                      <span style={{ fontSize: '0.85rem', width: '120px', color: theme.text }} className="text-truncate">{t.name}</span>
                      <div className="progress flex-grow-1 mx-2" style={{ height: '6px', backgroundColor: theme.bg }}>
                        <div className="progress-bar rounded" style={{ width: `${t.progress}%`, backgroundColor: t.color }}></div>
                      </div>
                      <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>{t.progress}%</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-4 h-100 shadow-sm" style={styles.card}>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h6 className="fw-bold mb-0">Recent Full Activity</h6>
              </div>
              <div className="d-flex flex-column gap-3 overflow-auto" style={{ maxHeight: '250px' }}>
                {filteredRecent.length === 0 ? (
                  <p style={{ color: theme.textMuted }} className="text-center mt-4">No recent sessions found.</p>
                ) : (
                  filteredRecent.slice(0, 5).map((item, i) => {
                    const acc = Math.round(item.acc);
                    let badgeColor = item.displayType === 'AI Interview' ? 'bg-danger' : item.displayType === 'Mock Test' ? 'bg-warning text-dark' : 'bg-primary';
                    
                    return (
                      <div key={i} className="d-flex justify-content-between align-items-center pb-3 border-bottom" style={{ borderColor: theme.cardBorder }}>
                        <div className="overflow-hidden me-2">
                          <span className={`badge ${badgeColor} mb-1`} style={{ fontSize: '0.65rem' }}>{item.displayType}</span>
                          <h6 className="mb-1 fw-bold text-truncate" style={{ fontSize: '0.85rem', color: theme.text }}>{item.category}</h6>
                          <small style={{ color: theme.textMuted, fontSize: '0.75rem' }}>{item.date.toLocaleDateString('en-GB')}</small>
                        </div>
                        <div className="text-end flex-shrink-0">
                          <h6 className="mb-0 fw-bold" style={{ color: acc >= 70 ? '#10b981' : acc >= 50 ? '#f59e0b' : '#ef4444', fontSize: '0.9rem' }}>{acc}%</h6>
                          <small style={{ fontSize: '0.75rem', color: acc >= 70 ? '#10b981' : acc >= 50 ? '#f59e0b' : '#ef4444' }}>{acc >= 70 ? 'Proficient' : 'Developing'}</small>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-4 h-100 shadow-sm" style={styles.card}>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h6 className="fw-bold mb-0">Weekly Platform Activity</h6>
              </div>
              <div style={{ height: '210px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData}>
                    <XAxis dataKey="name" tick={{fill: theme.textMuted, fontSize: 11}} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{fill: theme.bg}} contentStyle={{backgroundColor: theme.cardBg, border: `1px solid ${theme.cardBorder}`, color: theme.text}} />
                    <Bar dataKey="activity" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={12} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .hover-effect:hover { background-color: ${isDarkMode ? '#334155' : '#f1f5f9'} !important; transition: 0.2s; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${theme.bg}; }
        ::-webkit-scrollbar-thumb { background: ${theme.cardBorder}; border-radius: 4px; }
      `}</style>
    </div>
  );
};

export default Dashboard;