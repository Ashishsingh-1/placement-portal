import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeTaken, setTimeTaken] = useState(0); 
  
  const navigate = useNavigate();

  // 🔥 Theme Logic Added
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    const handleThemeChange = () => setIsDarkMode(localStorage.getItem('theme') === 'dark');
    window.addEventListener('theme-change', handleThemeChange);
    return () => window.removeEventListener('theme-change', handleThemeChange);
  }, []);

  const theme = {
    bg: isDarkMode ? '#0f172a' : '#f8fafc',
    text: isDarkMode ? '#f8fafc' : '#0f172a',
    cardBg: isDarkMode ? '#1e293b' : '#ffffff',
    cardBorder: isDarkMode ? '#334155' : '#e2e8f0',
    textMuted: isDarkMode ? '#94a3b8' : '#64748b',
    primary: '#4f46e5',
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert("Please log in to take the mock assessment!");
      navigate('/auth');
      return;
    }
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://placement-portal-yq2h.onrender.com/api/questions/random');
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, [navigate]);

  useEffect(() => {
    let timer;
    if (!showResult && questions.length > 0) {
      timer = setInterval(() => setTimeTaken((prev) => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [showResult, questions]);

  const submitQuizAndSaveScore = async (finalScore) => {
    setShowResult(true);
    const userId = localStorage.getItem('userId');
    if (userId && questions.length > 0) {
      try {
        await axios.post('https://placement-portal-yq2h.onrender.com/api/results/save', {
          userId: userId,
          score: finalScore,
          totalQuestions: questions.length,
          category: "Mixed Mock Assessment" 
        });
      } catch (error) {
        console.error("Error saving score:", error);
      }
    }
  };

  const handleAnswer = (selectedOption) => {
    let newScore = score;
    if (selectedOption === questions[currentIndex].correctAnswer) {
      newScore = score + 1;
      setScore(newScore);
    }
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      submitQuizAndSaveScore(newScore);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (questions.length === 0) {
    return <div className="min-h-screen d-flex justify-content-center align-items-center" style={{ backgroundColor: theme.bg, color: theme.text }}><h3 className="mt-5">Loading Mock Assessment...</h3></div>;
  }

  if (showResult) {
    return (
      <div className="min-h-screen d-flex align-items-center justify-content-center" style={{ backgroundColor: theme.bg, color: theme.text, fontFamily: "'Inter', sans-serif" }}>
        <div className="col-md-6 text-center">
          <div className="card shadow p-5 border-0 rounded-4" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <h2 className="text-success fw-bold">Assessment Completed! 🎉</h2>
            <h4 className="mt-4" style={{ color: theme.text }}>Your Score: {score} / {questions.length}</h4>
            <h5 className="mt-3 fw-bold" style={{ color: '#0ea5e9' }}>⏱ Total Time Taken: {formatTime(timeTaken)}</h5>
            <p className="mt-3" style={{ color: theme.textMuted }}>Your result has been saved to your dashboard.</p>
            <button className="btn mt-4 fw-bold px-4 py-2 text-white w-100" style={{ backgroundColor: theme.primary }} onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-5" style={{ backgroundColor: theme.bg, color: theme.text, fontFamily: "'Inter', sans-serif" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow border-0 rounded-4 overflow-hidden" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
              
              <div className="d-flex justify-content-between align-items-center p-4 border-bottom" style={{ backgroundColor: isDarkMode ? '#111827' : '#f1f5f9', borderColor: theme.cardBorder }}>
                <h5 className="mb-0 fw-bold" style={{ color: theme.text }}>Mock Assessment</h5>
                <h5 className="mb-0 fw-bold" style={{ color: '#0ea5e9' }}>⏱ {formatTime(timeTaken)}</h5>
              </div>

              <div className="card-body p-4 p-md-5">
                <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom" style={{ borderColor: theme.cardBorder }}>
                  <p className="mb-0 fw-bold" style={{ color: theme.textMuted }}>Question {currentIndex + 1} of {questions.length}</p>
                  <span className="badge px-3 py-2 fs-6 shadow-sm" style={{ backgroundColor: theme.primary }}>{questions[currentIndex].category}</span>
                </div>
                
                <h4 className="mb-4 mt-2 lh-base" style={{ whiteSpace: 'pre-line', color: theme.text }}>
                  {questions[currentIndex].questionText.replace('**Q ', '')}
                </h4>

                <div className="d-grid gap-3 mt-4">
                  {questions[currentIndex].options.map((option, index) => (
                    <button 
                      key={index}
                      className="btn text-start fs-5 p-3 rounded shadow-sm hover-option"
                      style={{ 
                        backgroundColor: 'transparent', 
                        color: theme.text,
                        border: `1px solid ${theme.cardBorder}`,
                        transition: 'all 0.2s' 
                      }}
                      onMouseOver={(e) => { e.target.style.backgroundColor = isDarkMode ? '#334155' : '#e2e8f0' }}
                      onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent' }}
                      onClick={() => handleAnswer(option)}
                    >
                      <strong className="me-3" style={{ color: theme.primary }}>{String.fromCharCode(65 + index)}.</strong> {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;