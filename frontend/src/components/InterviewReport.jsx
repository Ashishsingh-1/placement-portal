import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const InterviewReport = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const originalReport = location.state?.report;
  const [report, setReport] = useState(originalReport);

  const theme = {
    bg: '#05070A', panelBg: '#0F1523', borderColor: '#1E293B', textPrimary: '#F8FAFC',
    textSecondary: '#94A3B8', primaryBlue: '#3B82F6', success: '#10B981', warning: '#F59E0B', danger: '#EF4444', purple: '#8B5CF6',
    teal: '#14B8A6'
  };

  const getScoreColor = (score) => {
    if (score >= 80) return theme.success;
    if (score >= 60) return theme.warning;
    return theme.danger;
  };

  const getScoreText = (score) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good, Needs Polish";
    return "Needs Improvement";
  };

  if (!report) {
    return (
      <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center" style={{ backgroundColor: theme.bg, color: theme.textPrimary }}>
        <i className="bi bi-file-earmark-x-fill text-danger mb-3" style={{ fontSize: '4rem' }}></i>
        <h2 className="fw-bold mb-2">Report Not Found</h2>
        <p className="text-secondary mb-4">It seems the interview data was lost or you refreshed the page.</p>
        <button className="btn rounded-pill px-4 py-2 fw-bold text-white shadow-lg" style={{ backgroundColor: theme.primaryBlue }} onClick={() => navigate('/interview-selection')}>
          <i className="bi bi-arrow-left me-2"></i> Go to Dashboard
        </button>
      </div>
    );
  }

  const overallColor = getScoreColor(report.overallScore || 0);
  
  // Stats parsing with fallbacks
  const stats = report.answerStats || { totalQuestions: 0, answeredFully: 0, answeredPartially: 0, unanswered: 0 };

  return (
    <div className="min-vh-100 py-5 px-3" style={{ backgroundColor: theme.bg, color: theme.textPrimary, fontFamily: "'Inter', sans-serif" }}>
      <div className="container" style={{ maxWidth: '1150px' }}>
        
        {/* HEADER */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 animate-slide-up">
          <div>
            <h1 className="fw-bolder mb-1 premium-text-gradient" style={{ letterSpacing: '-0.5px' }}>Performance Analytics</h1>
            <p className="text-secondary mb-0 fs-6">AI-generated comprehensive evaluation report.</p>
          </div>
          <div className="d-flex gap-3 mt-3 mt-md-0">
            <button className="btn outline-btn rounded-pill px-4" onClick={() => window.print()}>
              <i className="bi bi-printer me-2"></i> Print Report
            </button>
            <button className="btn primary-btn rounded-pill px-4 shadow-lg" onClick={() => navigate('/interview-selection')}>
              <i className="bi bi-house-door-fill me-2"></i> Exit
            </button>
          </div>
        </div>

        <div className="row g-4">
          
          {/* LEFT COL: Score & Verdict */}
          <div className="col-lg-4 d-flex flex-column gap-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            
            {/* OVERALL SCORE CARD */}
            <div className="glass-card text-center p-5 d-flex flex-column justify-content-center align-items-center position-relative overflow-hidden">
              <div className="glow-bg" style={{ backgroundColor: overallColor }}></div>
              <h6 className="fw-bold text-uppercase tracking-wide mb-4" style={{ color: theme.textSecondary, letterSpacing: '2px' }}>Overall Score</h6>
              
              <div className="score-circle-wrapper position-relative d-flex justify-content-center align-items-center mb-4" style={{ width: '180px', height: '180px', borderRadius: '50%', background: `conic-gradient(${overallColor} ${(report.overallScore || 0) * 3.6}deg, #1E293B 0deg)`, boxShadow: `0 0 40px ${overallColor}30` }}>
                <div className="inner-circle d-flex flex-column justify-content-center align-items-center" style={{ width: '150px', height: '150px', borderRadius: '50%', backgroundColor: theme.panelBg }}>
                  <span className="fw-bolder" style={{ fontSize: '3.5rem', color: overallColor, lineHeight: '1' }}>{report.overallScore || 0}</span>
                  <span className="text-secondary fw-semibold" style={{ fontSize: '13px' }}>out of 100</span>
                </div>
              </div>
              
              <div className="d-inline-flex align-items-center gap-2 px-4 py-2 rounded-pill" style={{ backgroundColor: `${overallColor}15`, border: `1px solid ${overallColor}40` }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: overallColor }}></div>
                <span className="fw-bold" style={{ color: overallColor, fontSize: '14px' }}>
                  {getScoreText(report.overallScore || 0)}
                </span>
              </div>
            </div>

            {/* EXECUTIVE SUMMARY */}
            <div className="glass-card p-4 flex-grow-1" style={{ borderTop: `4px solid ${theme.purple}` }}>
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="icon-box" style={{ backgroundColor: `${theme.purple}20`, color: theme.purple }}>
                  <i className="bi bi-lightning-charge-fill"></i>
                </div>
                <h5 className="fw-bold mb-0 text-white">Executive Summary</h5>
              </div>
              <p className="text-secondary lh-lg mb-0" style={{ fontSize: '14.5px' }}>
                {report.verdict || "No verdict provided."}
              </p>
            </div>
          </div>

          {/* RIGHT COL: Metrics & Details */}
          <div className="col-lg-8 d-flex flex-column gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            
            {/* 🔥 NEW: ENGAGEMENT STATS ROW 🔥 */}
            <div className="row g-3">
              <div className="col-md-4">
                <div className="glass-card p-3 d-flex flex-column h-100" style={{ borderLeft: `4px solid ${theme.teal}` }}>
                  <span className="text-secondary fw-semibold mb-1" style={{ fontSize: '12px', textTransform: 'uppercase' }}>Fully Answered</span>
                  <div className="d-flex align-items-center gap-3 mt-auto">
                    <i className="bi bi-check-circle-fill fs-3" style={{ color: theme.teal }}></i>
                    <span className="fw-bold text-white fs-3">{stats.answeredFully}</span>
                    <span className="text-secondary align-self-end mb-1">/ {stats.totalQuestions}</span>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="glass-card p-3 d-flex flex-column h-100" style={{ borderLeft: `4px solid ${theme.warning}` }}>
                  <span className="text-secondary fw-semibold mb-1" style={{ fontSize: '12px', textTransform: 'uppercase' }}>Partially Answered</span>
                  <div className="d-flex align-items-center gap-3 mt-auto">
                    <i className="bi bi-dash-circle-fill fs-3" style={{ color: theme.warning }}></i>
                    <span className="fw-bold text-white fs-3">{stats.answeredPartially}</span>
                    <span className="text-secondary align-self-end mb-1">/ {stats.totalQuestions}</span>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="glass-card p-3 d-flex flex-column h-100" style={{ borderLeft: `4px solid ${theme.danger}` }}>
                  <span className="text-secondary fw-semibold mb-1" style={{ fontSize: '12px', textTransform: 'uppercase' }}>Unanswered / Silent</span>
                  <div className="d-flex align-items-center gap-3 mt-auto">
                    <i className="bi bi-x-circle-fill fs-3" style={{ color: theme.danger }}></i>
                    <span className="fw-bold text-white fs-3">{stats.unanswered}</span>
                    <span className="text-secondary align-self-end mb-1">/ {stats.totalQuestions}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CORE METRICS */}
            <div className="glass-card p-4">
              <h5 className="fw-bold mb-4 text-white">Skill Breakdown</h5>
              <div className="row g-4">
                {[
                  { label: 'Content Accuracy', key: 'contentQuality', icon: 'bi-bullseye' },
                  { label: 'Grammar & Vocab', key: 'grammarAndVocab', icon: 'bi-chat-quote' },
                  { label: 'Clarity & Flow', key: 'clarityAndConciseness', icon: 'bi-water' },
                  { label: 'Confidence', key: 'confidenceAndDelivery', icon: 'bi-person-raised-hand' }
                ].map((metric, idx) => {
                  const score = report?.metrics?.[metric.key] || 0;
                  const mColor = getScoreColor(score);
                  return (
                    <div className="col-md-6" key={idx}>
                      <div className="metric-box p-3 rounded-4" style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: `1px solid ${theme.borderColor}` }}>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <div className="d-flex align-items-center gap-2">
                            <i className={`bi ${metric.icon} text-secondary`}></i>
                            <span className="fw-semibold text-light" style={{ fontSize: '14px' }}>{metric.label}</span>
                          </div>
                          <span className="fw-bold fs-5" style={{ color: mColor }}>{score}%</span>
                        </div>
                        <div className="progress rounded-pill overflow-visible" style={{ height: '6px', backgroundColor: '#1E293B' }}>
                          <div className="progress-bar rounded-pill position-relative" role="progressbar" style={{ width: `${score}%`, backgroundColor: mColor, boxShadow: `0 0 10px ${mColor}` }}>
                            <div className="position-absolute end-0 top-50 translate-middle-y rounded-circle bg-white shadow" style={{ width: '12px', height: '12px' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* DETAILED FEEDBACK ROW */}
            <div className="row g-4 flex-grow-1">
              {/* Strengths / Explanation */}
              <div className="col-md-6 d-flex flex-column">
                <div className="glass-card p-4 flex-grow-1" style={{ borderTop: `4px solid ${theme.primaryBlue}` }}>
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div className="icon-box" style={{ backgroundColor: `${theme.primaryBlue}20`, color: theme.primaryBlue }}>
                      <i className="bi bi-shield-check"></i>
                    </div>
                    <h6 className="fw-bold mb-0 text-white">Content Feedback</h6>
                  </div>
                  <p className="text-secondary lh-base mb-0" style={{ fontSize: '14px' }}>
                    {report?.detailedAnalysis?.explanationFeedback || "No feedback available."}
                  </p>
                </div>
              </div>

              {/* Grammar Feedback */}
              <div className="col-md-6 d-flex flex-column">
                <div className="glass-card p-4 flex-grow-1" style={{ borderTop: `4px solid ${theme.warning}` }}>
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div className="icon-box" style={{ backgroundColor: `${theme.warning}20`, color: theme.warning }}>
                      <i className="bi bi-mic"></i>
                    </div>
                    <h6 className="fw-bold mb-0 text-white">Communication Feedback</h6>
                  </div>
                  <p className="text-secondary lh-base mb-0" style={{ fontSize: '14px' }}>
                    {report?.detailedAnalysis?.grammarFeedback || "No feedback available."}
                  </p>
                </div>
              </div>
            </div>

            {/* AREAS TO IMPROVE (Bullet Points) */}
            <div className="glass-card p-4 p-md-5 mt-2" style={{ border: `1px solid ${theme.danger}40`, backgroundColor: 'rgba(239, 68, 68, 0.02)' }}>
              <h5 className="fw-bold text-danger mb-4"><i className="bi bi-exclamation-triangle-fill me-2"></i> Critical Areas to Improve</h5>
              <div className="row g-3">
                {report?.detailedAnalysis?.areasToImprove?.map((point, idx) => (
                  <div className="col-12" key={idx}>
                    <div className="d-flex align-items-start gap-3 bg-dark p-3 rounded-4 custom-hover-card" style={{ border: `1px solid ${theme.borderColor}` }}>
                      <div className="d-flex justify-content-center align-items-center rounded-circle mt-1 flex-shrink-0" style={{ width: '24px', height: '24px', backgroundColor: `${theme.danger}20`, color: theme.danger }}>
                        <i className="bi bi-arrow-right-short fs-5"></i>
                      </div>
                      <span className="text-light" style={{ fontSize: '15px', lineHeight: '1.6' }}>{point}</span>
                    </div>
                  </div>
                ))}
                
                {(!report?.detailedAnalysis?.areasToImprove || report.detailedAnalysis.areasToImprove.length === 0) && (
                  <div className="text-secondary">No critical improvements found. Great job!</div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* PREMIUM CSS STYLES */}
      <style>{`
        .glass-card {
          background-color: ${theme.panelBg};
          border: 1px solid ${theme.borderColor};
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          position: relative;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .glass-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.4);
        }
        .glow-bg {
          position: absolute;
          top: -50px;
          left: 50%;
          transform: translateX(-50%);
          width: 150px;
          height: 150px;
          filter: blur(80px);
          opacity: 0.15;
          pointer-events: none;
        }
        .icon-box {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.2rem;
        }
        .premium-text-gradient {
          background: linear-gradient(to right, #ffffff, #94A3B8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .custom-hover-card {
          transition: background-color 0.2s ease;
        }
        .custom-hover-card:hover {
          background-color: rgba(255,255,255,0.05) !important;
        }
        .primary-btn {
          background-color: ${theme.primaryBlue};
          color: #fff;
          border: none;
          transition: all 0.2s;
        }
        .primary-btn:hover {
          background-color: #2563eb;
          transform: scale(1.05);
        }
        .outline-btn {
          background-color: transparent;
          color: #fff;
          border: 1px solid ${theme.borderColor};
          transition: all 0.2s;
        }
        .outline-btn:hover {
          background-color: rgba(255,255,255,0.1);
        }
        .animate-slide-up {
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes slideUp { 
          from { transform: translateY(30px); opacity: 0; } 
          to { transform: translateY(0); opacity: 1; } 
        }
        
        /* PRINT MEDIA QUERIES FOR CLEAN EXPORT */
        @media print {
          body { background-color: #f8f9fa !important; color: #000 !important; }
          .glass-card, .bg-dark { 
            background-color: #fff !important; 
            border: 1px solid #ddd !important; 
            box-shadow: none !important; 
            transform: none !important;
            break-inside: avoid;
          }
          .premium-text-gradient, .text-white, .text-light { color: #111 !important; -webkit-text-fill-color: #111 !important; }
          .text-secondary { color: #555 !important; }
          .glow-bg, .btn { display: none !important; }
          .progress { background-color: #eee !important; }
        }
      `}</style>
    </div>
  );
};

export default InterviewReport;