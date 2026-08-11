import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';

const Preparation = () => {
  const [allQuestions, setAllQuestions] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [currentTopicQuestions, setCurrentTopicQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); 
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState([]);

  // Theme Logic
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
    sidebarBg: isDarkMode ? '#111827' : '#ffffff',
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://placement-portal-yq2h.onrender.com/api/questions');
        const data = response.data;
        setAllQuestions(data);
        if (data.length > 0) {
          const initialCategory = data[0].category;
          setExpandedCategory(initialCategory);
          const topics = [...new Set(data.filter(q => q.category === initialCategory).map(q => q.topic))];
          setSelectedTopic(topics[0]);
          setCurrentTopicQuestions(data.filter(q => q.category === initialCategory && q.topic === topics[0]));
        }
        const savedBookmarks = JSON.parse(localStorage.getItem('userBookmarks')) || [];
        setBookmarkedQuestions(savedBookmarks);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  const handleCategoryClick = (category) => setExpandedCategory(expandedCategory === category ? '' : category);

  const handleTopicSelect = (category, topic) => {
    setSelectedTopic(topic);
    setCurrentTopicQuestions(allQuestions.filter(q => q.category === category && q.topic === topic));
    setCurrentQuestionIndex(0);
    resetOptions();
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentTopicQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      resetOptions();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      resetOptions();
    }
  };

  const resetOptions = () => {
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setShowExplanation(false);
  };

  const handleCheckAnswer = () => {
    if (!selectedOption) { alert("Please select an option first!"); return; }
    setIsAnswerChecked(true);
  };

  const handleBookmarkToggle = async (questionId) => {
    const userId = localStorage.getItem('userId'); 
    if (!userId) { alert("Please log in first to save questions!"); return; }
    try {
      const res = await axios.post('https://placement-portal-yq2h.onrender.com/api/auth/bookmark', { userId, questionId });
      const updatedBookmarks = res.data.bookmarks;
      setBookmarkedQuestions(updatedBookmarks);
      localStorage.setItem('userBookmarks', JSON.stringify(updatedBookmarks));
    } catch (err) {
      console.error("Error bookmarking question:", err);
    }
  };

  const categories = [...new Set(allQuestions.map(q => q.category))];
  const selectedQuestion = currentTopicQuestions[currentQuestionIndex];

  let passage = "";
  let actualQuestion = selectedQuestion ? selectedQuestion.questionText : "";

  if (actualQuestion.includes('**Q') && actualQuestion.indexOf('**Q') > 0) {
    const splitIndex = actualQuestion.indexOf('**Q');
    passage = actualQuestion.substring(0, splitIndex).trim();
    actualQuestion = actualQuestion.substring(splitIndex).trim();
  }

  const markdownComponents = {
    p: ({node, ...props}) => <p className="mb-2" {...props} />,
  };

  const renderQuestionArea = (qText) => {
    const isBookmarked = selectedQuestion && bookmarkedQuestions.includes(selectedQuestion._id);

    return (
      <>
        <div className="d-flex justify-content-between align-items-start mb-4 pb-3 border-bottom" style={{ borderColor: theme.cardBorder }}>
          <div style={{ maxWidth: '85%', width: '100%' }}>
            <div style={{ fontSize: '1.1rem', color: theme.text, lineHeight: '1.6' }}>
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {qText.replace(/\\n/g, '\n')}
              </ReactMarkdown>
            </div>
          </div>
          
          <div className="d-flex align-items-center gap-3">
            <button 
              onClick={() => handleBookmarkToggle(selectedQuestion._id)} 
              className="btn border shadow-sm rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: '45px', height: '45px', transition: 'all 0.2s', backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}
              title="Save Question"
            >
              {isBookmarked ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '24px', height: '24px', color: '#f59e0b' }}><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '24px', height: '24px', color: theme.textMuted }}><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.15-.316.586-.316.736 0l1.548 3.397a.75.75 0 0 0 .564.41l3.707.297c.348.028.487.458.218.695l-2.83 2.5a.75.75 0 0 0-.232.716l.852 3.65c.08.344-.294.617-.588.43l-3.23-1.996a.75.75 0 0 0-.742 0l-3.23 1.996c-.294.187-.669-.086-.588-.43l.852-3.65a.75.75 0 0 0-.232-.716l-2.83-2.5c-.269-.237-.13-.667.218-.695l3.707-.297a.75.75 0 0 0 .564-.41L11.48 3.5Z" /></svg>
              )}
            </button>
            <span className={`badge px-3 py-2 fs-6 shadow-sm ${selectedQuestion.difficulty === 'Easy' ? 'bg-success' : selectedQuestion.difficulty === 'Medium' ? 'bg-warning text-dark' : 'bg-danger'}`}>
              {selectedQuestion.difficulty}
            </span>
          </div>
        </div>

        <div className="mb-4">
          {selectedQuestion.options.map((opt, i) => {
            let btnBg = 'transparent';
            let btnText = theme.text;
            let btnBorder = theme.cardBorder;
            
            if (isAnswerChecked) {
              if (opt === selectedQuestion.correctAnswer) { btnBg = '#10b981'; btnText = '#fff'; btnBorder = '#10b981'; } 
              else if (opt === selectedOption) { btnBg = '#ef4444'; btnText = '#fff'; btnBorder = '#ef4444'; } 
            } else if (opt === selectedOption) {
              btnBg = theme.primary; btnText = '#fff'; btnBorder = theme.primary; 
            }
            
            return (
              <button key={i} className="btn w-100 text-start mb-3 fs-5 p-3 rounded shadow-sm"
                onClick={() => !isAnswerChecked && setSelectedOption(opt)} disabled={isAnswerChecked} 
                style={{ backgroundColor: btnBg, color: btnText, border: `1px solid ${btnBorder}`, transition: 'all 0.2s', borderLeft: isAnswerChecked ? '' : `4px solid ${theme.textMuted}` }}>
                <strong className="me-3">{String.fromCharCode(65 + i)}.</strong> {opt}
              </button>
            );
          })}
        </div>
        
        {!isAnswerChecked ? (
          <button className="btn text-white fw-bold px-5 py-2 fs-5 shadow" style={{ backgroundColor: theme.primary }} onClick={handleCheckAnswer}>Check Answer</button>
        ) : (
          <div className={`alert fs-5 shadow-sm border-0`} style={{ backgroundColor: selectedOption === selectedQuestion.correctAnswer ? (isDarkMode ? 'rgba(16, 185, 129, 0.1)' : '#d1fae5') : (isDarkMode ? 'rgba(239, 68, 68, 0.1)' : '#fee2e2'), color: selectedOption === selectedQuestion.correctAnswer ? '#10b981' : '#ef4444' }}>
            {selectedOption === selectedQuestion.correctAnswer ? (
              <h4 className="alert-heading fw-bold mb-0"><i className="bi bi-check-circle-fill me-2"></i>Brilliant! Correct Answer.</h4>
            ) : (
              <div>
                <h4 className="alert-heading fw-bold"><i className="bi bi-x-circle-fill me-2"></i>Oops! Incorrect Answer.</h4>
                <p className="mb-0">The correct answer is: <strong>{selectedQuestion.correctAnswer}</strong></p>
              </div>
            )}
            <div className="d-flex gap-3 mt-4">
              <button className="btn fw-bold shadow-sm" style={{ backgroundColor: theme.cardBg, color: theme.text, border: `1px solid ${theme.cardBorder}` }} onClick={resetOptions}><i className="bi bi-arrow-clockwise me-2"></i>Try Again</button>
              <button className="btn text-white fw-bold shadow-sm" style={{ backgroundColor: '#0ea5e9' }} onClick={() => setShowExplanation(!showExplanation)}>
                <i className="bi bi-lightbulb me-2"></i>{showExplanation ? 'Hide Solution' : 'View Solution'}
              </button>
            </div>
            {showExplanation && (
              <div className="mt-4 p-4 rounded border-0 shadow-sm" style={{ backgroundColor: theme.cardBg, color: theme.textMuted, borderStart: `4px solid #0ea5e9` }}>
                <h5 className="fw-bold mb-3" style={{ color: '#0ea5e9' }}>Solution / Explanation:</h5>
                <p className="mb-0" style={{ whiteSpace: 'pre-line' }}>{selectedQuestion.explanation}</p>
              </div>
            )}
          </div>
        )}
      </>
    );
  };

  return (
    <div className="container-fluid mt-2 mb-5" style={{ backgroundColor: theme.bg, color: theme.text, fontFamily: "'Inter', sans-serif", transition: 'all 0.3s ease' }}>
      <div className="row shadow rounded overflow-hidden" style={{ height: '85vh', backgroundColor: theme.cardBg, border: `1px solid ${theme.cardBorder}` }}>
        
        {/* 🔥 HYBRID SIDEBAR 🔥 (Light = Purana Design, Dark = Full Dark) */}
        <div className="col-md-3 p-0 border-end d-flex flex-column" style={{ height: '100%', backgroundColor: isDarkMode ? theme.sidebarBg : '#ffffff', borderColor: theme.cardBorder, transition: 'all 0.3s ease' }}>
          <div className="p-3 border-bottom z-1" style={{ backgroundColor: isDarkMode ? theme.sidebarBg : '#ffffff', borderColor: theme.cardBorder }}>
            <h5 className="mb-0 fw-bold" style={{ color: isDarkMode ? theme.text : '#212529' }}><i className="bi bi-journal-album me-2" style={{ color: theme.primary }}></i>Course Content</h5>
          </div>
          <div className="overflow-auto" style={{ flexGrow: 1, backgroundColor: isDarkMode ? theme.bg : '#f8f9fa' }}>
            {categories.map((cat, index) => {
              const isExpanded = expandedCategory === cat;
              const topicsForThisCat = [...new Set(allQuestions.filter(q => q.category === cat).map(q => q.topic))];
              return (
                <div key={cat}>
                  <div className="p-3 d-flex justify-content-between align-items-center"
                    style={{ 
                      backgroundColor: isExpanded ? (isDarkMode ? theme.primary : '#5a67d8') : (isDarkMode ? theme.sidebarBg : '#ffffff'), 
                      color: isExpanded ? 'white' : (isDarkMode ? theme.text : '#4a5568'), 
                      borderBottom: `1px solid ${isDarkMode ? theme.cardBorder : '#e2e8f0'}`, 
                      cursor: 'pointer' 
                    }}
                    onClick={() => handleCategoryClick(cat)}>
                    <span className="fw-bold" style={{ fontSize: '1.05rem' }}>{index + 1}. {cat}</span>
                    <i className={`bi bi-chevron-${isExpanded ? 'up' : 'down'}`}></i>
                  </div>
                  {isExpanded && (
                    <div style={{ backgroundColor: isDarkMode ? theme.sidebarBg : '#212529', color: 'white' }}>
                      {topicsForThisCat.map(topic => {
                        const isSelected = selectedTopic === topic;
                        return (
                          <div key={topic} className="p-3 d-flex align-items-center"
                            style={{ 
                              borderBottom: `1px solid ${isDarkMode ? theme.cardBorder : '#2d3748'}`, 
                              cursor: 'pointer', 
                              backgroundColor: isSelected ? (isDarkMode ? theme.cardBg : '#2d3748') : (isDarkMode ? theme.bg : '#1a202c'), 
                              borderLeft: isSelected ? `4px solid ${isDarkMode ? theme.primary : '#4299e1'}` : '4px solid transparent' 
                            }}
                            onClick={() => handleTopicSelect(cat, topic)}>
                            <i className={`bi ${isSelected ? 'bi-book-fill text-info' : 'bi-book text-secondary'} fs-4 me-3`}></i>
                            <div><div className={`fw-bold ${isSelected ? 'text-white' : 'text-light'}`} style={{ fontSize: '0.95rem' }}>{topic}</div></div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* MAIN QUESTION AREA */}
        <div className="col-md-9 p-0 d-flex flex-column" style={{ height: '100%', backgroundColor: theme.cardBg, transition: 'all 0.3s ease' }}>
          {selectedQuestion ? (
            <div className="d-flex flex-column h-100 overflow-hidden">
              <div className="p-3 border-bottom d-flex justify-content-between align-items-center z-1" style={{ backgroundColor: isDarkMode ? '#0f172a' : '#f8f9fa', borderColor: theme.cardBorder }}>
                <h5 className="mb-0 fw-bold" style={{ color: theme.textMuted }}>{selectedTopic} Practice</h5>
                <span className="badge rounded-pill px-3 py-2 fs-6 shadow-sm" style={{ backgroundColor: theme.primary }}>Question {currentQuestionIndex + 1} of {currentTopicQuestions.length}</span>
              </div>
              
              <div className="d-flex flex-grow-1 overflow-hidden">
                {passage ? (
                  <div className="row m-0 w-100 h-100">
                    <div className="col-md-6 p-4 border-end overflow-auto h-100" style={{ backgroundColor: isDarkMode ? '#0f172a' : '#f8f9fa', borderColor: theme.cardBorder }}>
                      <h5 className="fw-bold mb-3" style={{ color: theme.primary }}><i className="bi bi-bar-chart-fill me-2"></i>Data & Chart</h5>
                      <div style={{ fontSize: '1.05rem', color: theme.text, lineHeight: '1.6' }}>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{passage.replace(/\\n/g, '\n')}</ReactMarkdown>
                      </div>
                    </div>
                    <div className="col-md-6 p-4 overflow-auto h-100">{renderQuestionArea(actualQuestion)}</div>
                  </div>
                ) : (
                  <div className="w-100 p-4 p-md-5 overflow-auto h-100">{renderQuestionArea(actualQuestion)}</div>
                )}
              </div>
              
              <div className="p-3 border-top d-flex justify-content-between z-1" style={{ backgroundColor: isDarkMode ? '#0f172a' : '#f8f9fa', borderColor: theme.cardBorder }}>
                <button className="btn fw-bold px-4" style={{ backgroundColor: 'transparent', color: theme.text, border: `1px solid ${theme.cardBorder}` }} onClick={handlePrevQuestion} disabled={currentQuestionIndex === 0}><i className="bi bi-arrow-left me-2"></i> Previous</button>
                <button className="btn text-white fw-bold px-4" style={{ backgroundColor: theme.primary }} onClick={handleNextQuestion} disabled={currentQuestionIndex === currentTopicQuestions.length - 1}>Next Question <i className="bi bi-arrow-right ms-2"></i></button>
              </div>
            </div>
          ) : (
            <div className="d-flex align-items-center justify-content-center h-100" style={{ color: theme.textMuted }}><div className="spinner-border text-primary me-2"></div> Loading...</div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Preparation;