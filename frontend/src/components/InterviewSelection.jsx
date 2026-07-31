import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';

// 🔥 100% FIXED WORKER LINK (Ab version mismatch nahi hoga) 🔥
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

const InterviewSelection = () => {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [resumeAnalyzed, setResumeAnalyzed] = useState(false);
  const [extractedText, setExtractedText] = useState("");

  const isDarkMode = localStorage.getItem('theme') === 'dark';
  
  const theme = {
    bg: isDarkMode ? '#000000' : '#f9fafb',
    text: isDarkMode ? '#ffffff' : '#1f2937',
    cardBg: isDarkMode ? '#171717' : '#ffffff',
    cardBorder: isDarkMode ? '#262626' : '#e5e7eb'
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setUploading(true);
    setResumeAnalyzed(false);

    const reader = new FileReader();
    reader.onload = async function() {
      try {
        const typedarray = new Uint8Array(this.result);
        const pdf = await pdfjsLib.getDocument(typedarray).promise;
        let text = "";
        
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items.map(item => item.str).join(" ");
        }

        setExtractedText(text);
        setResumeAnalyzed(true);
      } catch (err) {
        console.error("PDF Parsing Error:", err);
        alert("Failed to read PDF. Make sure it's a valid text-based resume.");
      } finally {
        setUploading(false);
      }
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  // 🔥 YAHAN CHANGE KIYA HAI: isNewInterview: true add kar diya 🔥
  const startInterview = (roundType) => {
    navigate('/interview-room', { state: { roundType, resumeText: extractedText, isNewInterview: true } });
  };

  return (
    <div className="min-h-screen d-flex flex-column align-items-center justify-content-center py-5" style={{ backgroundColor: theme.bg, color: theme.text, fontFamily: "'Inter', sans-serif" }}>
      <div className="text-center mb-5">
        <h1 className="fw-bold mb-3">Select Interview Round</h1>
        <p style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}>Upload your resume and choose your simulation round</p>
      </div>

      {/* Resume Upload Section */}
      <div className="card p-4 shadow-sm mb-5 rounded-4 text-center mx-auto" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder, maxWidth: '600px', width: '100%' }}>
        <h5 className="mb-3 fw-bold" style={{ color: theme.text }}>📄 Upload Resume (PDF)</h5>
        <p className="small mb-3" style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}>For personalized questions based on your skills and projects.</p>
        <input type="file" accept=".pdf" className="form-control mb-3" onChange={handleFileChange} disabled={uploading} />
        
        {uploading && <div className="text-primary small fw-bold mt-2"><div className="spinner-border spinner-border-sm me-2" role="status"></div>Analyzing Resume...</div>}
        {resumeAnalyzed && <div className="text-success small fw-bold mt-2"><i className="bi bi-check-circle-fill me-1"></i>Resume Analyzed Successfully!</div>}
      </div>

      <div className="row justify-content-center gap-4 w-100 px-4" style={{ maxWidth: '1000px' }}>
        <div className="col-md-3">
          <div className="card p-4 shadow-sm border text-center h-100 rounded-4" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder, cursor: uploading ? 'not-allowed' : 'pointer', opacity: uploading ? 0.6 : 1 }} onClick={() => !uploading && startInterview('HR')}>
            <div className="display-4 mb-3 text-primary">🤝</div>
            <h4 className="fw-bold" style={{ color: theme.text }}>HR Round</h4>
            <p className="small mb-4" style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}>Behavioral, cultural fit, and personal questions.</p>
            <button className="btn btn-primary w-100 fw-bold mt-auto" disabled={uploading}>{uploading ? "Wait..." : "Start HR"}</button>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-4 shadow-sm border text-center h-100 rounded-4" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder, cursor: uploading ? 'not-allowed' : 'pointer', opacity: uploading ? 0.6 : 1 }} onClick={() => !uploading && startInterview('MR')}>
            <div className="display-4 mb-3 text-warning">💼</div>
            <h4 className="fw-bold" style={{ color: theme.text }}>MR Round</h4>
            <p className="small mb-4" style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}>Managerial, situational, and leadership questions.</p>
            <button className="btn btn-warning w-100 fw-bold mt-auto text-dark" disabled={uploading}>{uploading ? "Wait..." : "Start MR"}</button>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-4 shadow-sm border text-center h-100 rounded-4" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder, cursor: uploading ? 'not-allowed' : 'pointer', opacity: uploading ? 0.6 : 1 }} onClick={() => !uploading && startInterview('TR')}>
            <div className="display-4 mb-3 text-danger">⚙️</div>
            <h4 className="fw-bold" style={{ color: theme.text }}>TR Round</h4>
            <p className="small mb-4" style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}>Technical concepts, coding logic, and core subjects.</p>
            <button className="btn btn-danger w-100 fw-bold mt-auto" disabled={uploading}>{uploading ? "Wait..." : "Start TR"}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewSelection;