import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TOTAL_QUESTIONS = 7; 

const STATUS = {
  STANDBY: 'STANDBY',
  INIT: 'INIT',
  AI_SPEAKING: 'AI_SPEAKING',
  RECORDING: 'RECORDING', 
  PROCESSING: 'PROCESSING' 
};

let persistentTranscript = "";

const InterviewRoom = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { roundType = 'Software Engineer HR', resumeText = '' } = location.state || {}; 

  const [questionIndex, setQuestionIndex] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState("System Ready. Please start the interview.");
  const [chatHistory, setChatHistory] = useState([]);
  const [timeLeft, setTimeLeft] = useState(1800); 
  const [hasPermissions, setHasPermissions] = useState(false);
  const [status, setStatus] = useState(STATUS.STANDBY);
  const [liveText, setLiveText] = useState("");

  const videoRef = useRef(null);
  const chatScrollRef = useRef(null);
  const statusRef = useRef(STATUS.STANDBY);
  
  const previousQuestionsRef = useRef([]);
  const currentQuestionRef = useRef('');
  const currentExplanationRef = useRef(''); 
  const transcriptionsRef = useRef([]); 

  const silenceTimeoutRef = useRef(null);
  const silenceAttemptRef = useRef(0); 

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const requestFrameRef = useRef(null);
  const streamRef = useRef(null);

  const micLevelRef = useRef(null);
  const alexaCoreRef = useRef(null);
  const liveTextRecRef = useRef(null);

  const theme = {
    bg: '#030712', 
    panelBg: 'rgba(17, 24, 39, 0.65)', 
    borderColor: 'rgba(255, 255, 255, 0.08)',
    textPrimary: '#F9FAFB',
    textSecondary: '#9CA3AF', 
    primaryBlue: '#3B82F6', 
    chatAiBg: 'rgba(30, 41, 59, 0.8)', 
    chatUserBg: 'rgba(59, 130, 246, 0.15)', 
    dangerBg: '#EF4444',
  };

  const updateStatus = (newStatus) => {
    setStatus(newStatus);
    statusRef.current = newStatus;
  };

  const handleSilenceTimeout = () => {
    if (statusRef.current !== STATUS.RECORDING) return;
    const finalAnswer = persistentTranscript.trim();
    forceSubmitAnswer(finalAnswer === "" ? "[User remained silent]" : finalAnswer);
  };

  const startSilenceTimer = () => {
    if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
    silenceTimeoutRef.current = setTimeout(() => { handleSilenceTimeout(); }, 12000); 
  };

  useEffect(() => {
    if (status === STATUS.STANDBY) return; 
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        alert("🚨 PROCTORING ALERT: Tab switching detected! Interview Terminated.");
        navigate('/interview-selection');
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [navigate, status]);

  useEffect(() => {
    let isComponentMounted = true;
    const initMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: true, 
            audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } 
        });
        if (!isComponentMounted) {
          stream.getTracks().forEach(track => track.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
        setHasPermissions(true);
      } catch (err) {
        alert("Permission Denied: Please allow Camera and Microphone access.");
        navigate('/interview-selection');
      }
    };
    initMedia();

    return () => {
      isComponentMounted = false;
      if (streamRef.current) streamRef.current.getTracks().forEach(track => track.stop());
      cancelAnimationFrame(requestFrameRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
      if (liveTextRecRef.current) {
          liveTextRecRef.current.onend = null;
          try { liveTextRecRef.current.stop(); } catch(e){}
      }
      window.speechSynthesis.cancel();
      if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
    };
  }, [navigate]);

  useEffect(() => {
    let recognition = null;
    let isIntentionallyStopped = false;

    if (status === STATUS.RECORDING) {
      persistentTranscript = ""; 
      setLiveText("");
      startSilenceTimer(); 
      
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SR) {
        recognition = new SR();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-IN'; 

        recognition.onresult = (event) => {
          let interim = "";
          let final = "";
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) final += event.results[i][0].transcript + " ";
            else interim += event.results[i][0].transcript;
          }
          persistentTranscript += final;
          setLiveText(persistentTranscript + interim);
          startSilenceTimer(); 
        };
        recognition.onerror = () => {}; 
        recognition.onend = () => {
          if (!isIntentionallyStopped && statusRef.current === STATUS.RECORDING) {
            try { recognition.start(); } catch(e){}
          }
        };
        try { recognition.start(); } catch(e){}
        liveTextRecRef.current = recognition;
      }
    }
    return () => {
      isIntentionallyStopped = true;
      if (recognition) {
        recognition.onend = null;
        try { recognition.stop(); } catch(e){}
      }
    };
  }, [status]);

  const handleStartInterview = () => {
    const unlockUtterance = new SpeechSynthesisUtterance("");
    unlockUtterance.volume = 0; 
    window.speechSynthesis.speak(unlockUtterance);
    fetchQuestion(1);
  };

  const speakQuestion = (text) => {
    window.speechSynthesis.cancel();
    updateStatus(STATUS.AI_SPEAKING);
    setLiveText("");

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95; 
    utterance.pitch = 1.4; 
    
    const voices = window.speechSynthesis.getVoices();
    const sweetVoice = voices.find(v => v.name.includes('Zira') || v.name.includes('Female')) || voices.find(v => v.lang === 'en-US');
    if (sweetVoice) utterance.voice = sweetVoice;
    
    utterance.onend = () => { setTimeout(() => { startRecording(); }, 300); };
    window.speechSynthesis.speak(utterance);
  };

  const speakFinalAndEvaluate = (text) => {
    window.speechSynthesis.cancel();
    updateStatus(STATUS.AI_SPEAKING);
    setLiveText("");

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95; 
    utterance.pitch = 1.4; 
    
    const voices = window.speechSynthesis.getVoices();
    const sweetVoice = voices.find(v => v.name.includes('Zira') || v.name.includes('Female')) || voices.find(v => v.lang === 'en-US');
    if (sweetVoice) utterance.voice = sweetVoice;
    
    utterance.onend = async () => {
        updateStatus(STATUS.INIT);
        alert("Interview Complete! Generating your detailed evaluation report...");
        try {
            const reportRes = await axios.post('http://localhost:5000/api/interview/evaluate-interview', {
                roundType: roundType,
                transcriptions: transcriptionsRef.current
            });
            navigate('/interview-report', { state: { report: reportRes.data } });
        } catch(err) {
            alert("Error generating report. Please check server.");
        }
    };
    
    window.speechSynthesis.speak(utterance);
  };

  const startRecording = () => {
    updateStatus(STATUS.RECORDING);
    const stream = streamRef.current;
    if (!stream) return;

    if (!audioContextRef.current) { audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)(); }
    const audioCtx = audioContextRef.current;
    if (audioCtx.state === 'suspended') audioCtx.resume();
    
    const analyser = audioCtx.createAnalyser();
    analyser.minDecibels = -90; 
    const source = audioCtx.createMediaStreamSource(stream);
    source.connect(analyser);
    analyserRef.current = analyser;
    monitorVolume();
  };

  const forceSubmitAnswer = (autoSubmittedText = null) => {
    if (statusRef.current === STATUS.RECORDING) {
        const finalAnswerText = autoSubmittedText || persistentTranscript.trim();

        if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
        if(liveTextRecRef.current) {
            liveTextRecRef.current.onend = null;
            try { liveTextRecRef.current.stop(); } catch(e){}
        }

        updateStatus(STATUS.PROCESSING);
        
        silenceAttemptRef.current = 0;
        sendTextToBackend(finalAnswerText);
    }
  };

  const monitorVolume = () => {
    if (statusRef.current !== STATUS.RECORDING) return;
    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    let maxVolume = 0;
    for (let i = 0; i < bufferLength; i++) {
        if (dataArray[i] > maxVolume) maxVolume = dataArray[i];
    }

    const isSpeaking = maxVolume > 20; 
    if (micLevelRef.current) {
        const percent = Math.min(100, (maxVolume / 180) * 100);
        micLevelRef.current.style.width = `${percent}%`;
        micLevelRef.current.style.backgroundColor = isSpeaking ? '#10B981' : '#EF4444';
    }
    if (alexaCoreRef.current) {
        const scale = 1 + (maxVolume / 400);
        alexaCoreRef.current.style.transform = `scale(${scale})`;
        alexaCoreRef.current.style.opacity = isSpeaking ? '1' : '0.6';
    }
    requestFrameRef.current = requestAnimationFrame(monitorVolume);
  };

  const sendTextToBackend = async (textAnswer) => {
    try {
      if (questionIndex === TOTAL_QUESTIONS && textAnswer !== "[User remained silent]") {
        const res = await axios.post('http://localhost:5000/api/interview/wrap-up', {
            roundType,
            userTranscript: textAnswer
        });

        // Add to transcript for evaluation
        transcriptionsRef.current.push({
            question: currentQuestionRef.current,
            answer: textAnswer,
            explanation: currentExplanationRef.current
        });

        const finalReply = res.data.finalReply;
        setChatHistory(prev => [
            ...prev, 
            { role: 'user', text: textAnswer, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) },
            { role: 'ai', text: finalReply, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
        ]);
        speakFinalAndEvaluate(finalReply);
        return;
      }

      const res = await axios.post('http://localhost:5000/api/interview/process-text-answer', {
        roundType: roundType,
        questionIndex: questionIndex,
        currentQuestion: currentQuestionRef.current,
        userTranscript: textAnswer,
        resumeText: resumeText,
        previousQuestions: previousQuestionsRef.current
      });

      // 🔥 THE ULTIMATE FIX: Using exact JSON flags from backend 🔥
      const { userTranscript, spokenDialogue, pureQuestion, explanation, isRepeat } = res.data;

      setChatHistory(prev => [
        ...prev, 
        { role: 'user', text: userTranscript, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
      ]);

      if (!isRepeat) {
          // If valid answer -> Save to transcript, increment question, and update history
          transcriptionsRef.current.push({
              question: currentQuestionRef.current,
              answer: userTranscript,
              explanation: currentExplanationRef.current
          });

          setQuestionIndex(prev => prev + 1);
          previousQuestionsRef.current.push(pureQuestion); 
          currentQuestionRef.current = pureQuestion;
          currentExplanationRef.current = explanation;
          setCurrentQuestion(pureQuestion);
      }
      
      setChatHistory(prev => [...prev, { role: 'ai', text: spokenDialogue, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
      speakQuestion(spokenDialogue);

    } catch (err) {
      console.error("❌ Processing Error:", err);
      alert("Network Error: Could not connect to AI. Please try answering again.");
      updateStatus(STATUS.RECORDING); 
    }
  };

  const fetchQuestion = async (index) => {
    updateStatus(STATUS.INIT);
    silenceAttemptRef.current = 0; 
    try {
      const res = await axios.post('http://localhost:5000/api/interview/generate-question', { 
          roundType, 
          resumeText,
          previousQuestions: previousQuestionsRef.current
      });
      const qText = res.data.question;
      const expText = res.data.explanation; 
      
      currentQuestionRef.current = qText;
      currentExplanationRef.current = expText; 
      setCurrentQuestion(qText);
      previousQuestionsRef.current.push(qText);

      setChatHistory(prev => [...prev, { role: 'ai', text: qText, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
      speakQuestion(qText);
    } catch (err) {
      console.error("Backend Failed", err);
    } 
  };

  useEffect(() => {
    if (chatScrollRef.current) chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
  }, [chatHistory, status]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  let sphereStateClass = 'sphere-idle';
  let glowColor = 'rgba(59, 130, 246, 0.4)'; 
  let statusText = "System Standby";
  let statusBadgeClass = "badge-glass";
  
  if (status === STATUS.AI_SPEAKING) { 
    sphereStateClass = 'sphere-speaking'; glowColor = 'rgba(0, 229, 255, 0.8)'; 
    statusText = "Interviewer Speaking..."; statusBadgeClass = "badge-glass-info";
  } else if (status === STATUS.RECORDING) { 
    sphereStateClass = 'sphere-listening'; glowColor = 'rgba(239, 68, 68, 0.8)'; 
    statusText = "Listening (Speak Now)"; statusBadgeClass = "badge-glass-danger pulse-border";
  } else if (status === STATUS.PROCESSING || status === STATUS.INIT) { 
    sphereStateClass = 'sphere-thinking'; glowColor = 'rgba(168, 85, 247, 0.8)'; 
    statusText = "Analyzing Response..."; statusBadgeClass = "badge-glass-purple";
  }

  const layoutHeight = "calc(100vh - 40px)";

  return (
    <div className="position-relative d-flex flex-column px-3 py-4 ambient-bg" style={{ minHeight: layoutHeight, fontFamily: "'Inter', sans-serif", color: theme.textPrimary }}>
      
      {/* MESH GRADIENT BACKGROUND */}
      <div className="mesh-bg"></div>

      {!hasPermissions && (
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center" style={{ backgroundColor: theme.bg, zIndex: 9999 }}>
          <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }} role="status"></div>
          <h4 className="fw-bold">Establishing Secure Connection...</h4>
          <p className="text-secondary">Please allow camera and microphone access.</p>
        </div>
      )}

      {hasPermissions && status === STATUS.STANDBY && (
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center" style={{ backgroundColor: 'rgba(3, 7, 18, 0.8)', zIndex: 9998, backdropFilter: 'blur(12px)' }}>
          <div className="text-center p-5 rounded-4 glass-panel border border-secondary border-opacity-25" style={{ boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.5)` }}>
            <div className="mb-4"><i className="bi bi-shield-lock-fill" style={{ fontSize: '3.5rem', color: theme.textPrimary }}></i></div>
            <h2 className="text-white fw-bold mb-2 tracking-tight">Secure Environment Ready</h2>
            <p className="text-secondary mb-4">Ensure your environment is quiet before starting the assessment.</p>
            <button className="btn btn-lg rounded-pill px-5 py-3 fw-bold premium-btn" onClick={(e) => { e.currentTarget.style.transform = 'scale(0.95)'; handleStartInterview(); }}>COMMENCE INTERVIEW</button>
          </div>
        </div>
      )}

      {/* TOP NAVIGATION BAR */}
      <div className="d-flex flex-wrap justify-content-between align-items-center p-3 mb-4 rounded-4 glass-panel border border-secondary border-opacity-10 position-relative z-1">
        <div className="d-flex align-items-center gap-4 flex-wrap">
          <div className="d-flex align-items-center gap-3 pe-4" style={{ borderRight: `1px solid ${theme.borderColor}` }}>
            <div className="rounded-circle d-flex align-items-center justify-content-center bg-white bg-opacity-10" style={{ width: '40px', height: '40px' }}><i className="bi bi-briefcase-fill text-white fs-6"></i></div>
            <div><small className="d-block text-secondary fw-bold tracking-widest text-uppercase" style={{ fontSize: '10px' }}>Assessment Role</small><span className="fw-bold fs-6 text-white">{roundType}</span></div>
          </div>
          <div className="d-flex align-items-center gap-3">
            <div className="rounded-circle d-flex align-items-center justify-content-center bg-white bg-opacity-10" style={{ width: '40px', height: '40px' }}><i className="bi bi-stopwatch text-white fs-6"></i></div>
            <div><small className="d-block text-secondary fw-bold tracking-widest text-uppercase" style={{ fontSize: '10px' }}>Session Time</small><span className="fw-bolder fs-5 text-white">{formatTime(timeLeft)}</span></div>
          </div>
        </div>
        <div className="d-none d-md-block">
            <span className={`badge rounded-pill px-4 py-2 fw-semibold ${statusBadgeClass}`} style={{ fontSize: '13px', letterSpacing: '0.5px' }}>
                <i className={`bi ${status === STATUS.RECORDING ? 'bi-mic-fill pulse-icon' : 'bi-activity'} me-2`}></i>
                {statusText}
            </span>
        </div>
      </div>

      <div className="row g-4 flex-grow-1 position-relative z-1">
        
        {/* LEFT PANE */}
        <div className="col-lg-5 d-flex flex-column">
          <div className="flex-grow-1 rounded-4 d-flex flex-column justify-content-center align-items-center position-relative p-4 glass-panel border border-secondary border-opacity-10">
             
             <div className="position-absolute top-0 start-0 m-4 rounded-4 overflow-hidden" style={{ width: '140px', height: '100px', backgroundColor: '#000', zIndex: 10, border: '1px solid rgba(255,255,255,0.15)', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
                <video ref={videoRef} autoPlay muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }}></video>
                <div className="position-absolute bottom-0 start-0 w-100 py-1" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', fontSize: '10px' }}>
                    <div className="d-flex justify-content-center align-items-center gap-1 pb-1">
                      <div className="rounded-circle bg-danger" style={{ width: '6px', height: '6px', animation: 'blink 1.5s infinite' }}></div>
                      <span className="text-white fw-bold tracking-widest">LIVE REC</span>
                    </div>
                </div>
             </div>
             
             <div className="d-flex flex-column align-items-center justify-content-center w-100 h-100">
               <div className="alexa-container">
                 <div className={`alexa-sphere ${sphereStateClass}`}><div className="glass-highlight"></div><div className="core-energy" ref={alexaCoreRef}></div></div>
                 <div className="alexa-ring" style={{ backgroundColor: glowColor, boxShadow: `0 0 30px ${glowColor}, 0 0 60px ${glowColor}` }}></div>
                 <div className={`alexa-shadow ${status === STATUS.AI_SPEAKING ? 'shadow-speaking' : ''}`}></div>
               </div>
             </div>
          </div>
        </div>

        {/* RIGHT PANE */}
        <div className="col-lg-7 d-flex flex-column">
          <div className="card flex-grow-1 border-0 rounded-4 d-flex flex-column overflow-hidden glass-panel border border-secondary border-opacity-10">
            
            <div className="px-4 py-3 d-flex align-items-center justify-content-between border-bottom border-secondary border-opacity-10" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-chat-left-text text-secondary fs-5"></i>
                <h6 className="fw-bold mb-0 text-white tracking-wide">Interview Transcript</h6>
              </div>
              <span className="badge rounded-pill fw-bold px-3 py-2" style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: theme.textSecondary, border: `1px solid rgba(255,255,255,0.1)` }}>
                Phase {questionIndex} / {TOTAL_QUESTIONS}
              </span>
            </div>

            <div className="flex-grow-1 overflow-auto p-4 custom-scrollbar" ref={chatScrollRef} style={{ maxHeight: 'calc(100vh - 280px)', scrollBehavior: 'smooth' }}>
              {chatHistory.map((msg, idx) => (
                <div key={idx} className={`mb-4 d-flex flex-column ${msg.role === 'user' ? 'align-items-end' : 'align-items-start'} animate-slide-up`}>
                  
                  {msg.role === 'ai' && (
                    <div className="d-flex align-items-center mb-2 gap-2 ps-1">
                      <div className="rounded-circle d-flex justify-content-center align-items-center bg-white bg-opacity-10" style={{width: '24px', height: '24px'}}><i className="bi bi-robot text-white" style={{fontSize:'12px'}}></i></div>
                      <small className="text-secondary fw-bold tracking-widest text-uppercase" style={{ fontSize: '10px' }}>Lead Interviewer</small>
                    </div>
                  )}
                  {msg.role === 'user' && (
                    <div className="d-flex align-items-center mb-2 gap-2 pe-1">
                      <small className="text-secondary fw-bold tracking-widest text-uppercase" style={{ fontSize: '10px' }}>Candidate (You)</small>
                      <div className="rounded-circle d-flex justify-content-center align-items-center bg-primary bg-opacity-25" style={{width: '24px', height: '24px'}}><i className="bi bi-person text-white" style={{fontSize:'12px'}}></i></div>
                    </div>
                  )}
                  
                  <div className="p-3 shadow" style={{ 
                    backgroundColor: msg.role === 'user' ? theme.chatUserBg : theme.chatAiBg, 
                    maxWidth: '85%', 
                    borderRadius: '16px',
                    borderBottomLeftRadius: msg.role === 'ai' ? '4px' : '16px', 
                    borderBottomRightRadius: msg.role === 'user' ? '4px' : '16px',
                    border: msg.role === 'ai' ? `1px solid rgba(255,255,255,0.05)` : `1px solid rgba(59, 130, 246, 0.2)`,
                    backdropFilter: 'blur(10px)'
                  }}>
                    <p className="mb-0 text-white" style={{ fontSize: '14.5px', lineHeight: '1.6', fontWeight: '400', letterSpacing: '0.2px' }}>{msg.text}</p>
                  </div>
                </div>
              ))}

              {(status === STATUS.PROCESSING || status === STATUS.INIT) && (
                <div className="mb-4 d-flex flex-column align-items-start animate-slide-up">
                    <div className="d-flex align-items-center mb-2 gap-2 ps-1">
                      <div className="rounded-circle d-flex justify-content-center align-items-center" style={{width: '24px', height: '24px', backgroundColor: 'rgba(168, 85, 247, 0.2)'}}><i className="bi bi-cpu text-white" style={{fontSize:'12px'}}></i></div>
                      <small className="text-secondary fw-bold tracking-widest text-uppercase" style={{ fontSize: '10px' }}>Processing</small>
                    </div>
                    <div className="p-3 shadow-sm d-flex align-items-center" style={{ backgroundColor: theme.chatAiBg, borderRadius: '16px', borderBottomLeftRadius: '4px', border: `1px solid rgba(255,255,255,0.05)`, minWidth: '70px', backdropFilter: 'blur(10px)' }}>
                        <div className="typing-dots"><span></span><span></span><span></span></div>
                    </div>
                </div>
              )}
            </div>

            <div className="p-3 border-top border-secondary border-opacity-10" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
              <div className="position-relative overflow-hidden d-flex flex-column justify-content-center shadow-inner" style={{ 
                  borderRadius: '12px', 
                  border: status === STATUS.RECORDING ? `1px solid rgba(239, 68, 68, 0.3)` : `1px solid rgba(255,255,255,0.05)`, 
                  backgroundColor: status === STATUS.RECORDING ? 'rgba(239, 68, 68, 0.03)' : 'rgba(0,0,0,0.5)', 
                  minHeight: '75px',
                  transition: 'all 0.3s ease'
              }}>
                
                {status === STATUS.RECORDING && (
                    <div className="position-absolute top-0 start-0 m-2 ms-3 text-danger d-flex align-items-center gap-2">
                        <div className="rounded-circle bg-danger pulse-icon" style={{width:'8px', height:'8px'}}></div>
                        <small className="fw-bold tracking-widest" style={{ fontSize: '9px' }}>AUDIO INPUT ACTIVE</small>
                    </div>
                )}

                <div className={`px-4 py-3 text-white ${status === STATUS.RECORDING ? 'mt-3' : ''}`} style={{ 
                    maxHeight: '100px', 
                    overflowY: 'auto', 
                    opacity: status === STATUS.RECORDING ? 1 : 0.4, 
                    fontStyle: status === STATUS.RECORDING ? 'normal' : 'italic', 
                    zIndex: 2, 
                    lineHeight: '1.5', 
                    fontSize: '14.5px',
                    fontWeight: '300'
                }}>
                  {status === STATUS.AI_SPEAKING ? "Interviewer is speaking..." : 
                   status === STATUS.RECORDING ? (liveText || "Speak your answer clearly...") : 
                   status === STATUS.PROCESSING ? "Analyzing contextual data..." : 
                   "Awaiting system readiness..."}
                </div>
                
                {(status === STATUS.RECORDING) && (
                    <div ref={micLevelRef} style={{ position: 'absolute', bottom: 0, left: 0, height: '3px', backgroundColor: theme.dangerBg, width: '0%', transition: 'width 0.1s ease-out' }}></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .alexa-container { position: relative; width: 220px; height: 250px; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .alexa-sphere { position: relative; z-index: 2; width: 160px; height: 160px; border-radius: 50%; background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1), #050505 70%); box-shadow: inset -10px -10px 25px rgba(0,0,0,0.9), inset 5px 5px 20px rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; transition: all 0.5s ease; }
        .glass-highlight { position: absolute; top: 8%; left: 18%; width: 40%; height: 20%; border-radius: 50%; background: linear-gradient(to bottom, rgba(255,255,255,0.5), transparent); transform: rotate(-30deg); pointer-events: none; z-index: 3; }
        .core-energy { width: 75%; height: 75%; border-radius: 50%; filter: blur(15px); transition: all 0.5s ease; mix-blend-mode: screen; }
        .alexa-ring { position: absolute; bottom: 35px; width: 130px; height: 15px; border-radius: 50%; z-index: 1; filter: blur(5px); transition: all 0.5s ease; }
        .alexa-shadow { position: absolute; bottom: -5px; width: 80px; height: 10px; background: rgba(0,0,0,0.8); border-radius: 50%; filter: blur(6px); transition: 0.5s; }
        .sphere-idle { animation: floatIdle 6s ease-in-out infinite; }
        .sphere-idle .core-energy { background: #3B82F6; opacity: 0.4; }
        .sphere-listening { animation: floatListen 4s ease-in-out infinite; } 
        .sphere-listening .core-energy { background: #EF4444; opacity: 0.8; }
        .sphere-thinking { animation: floatThink 4s ease-in-out infinite; }
        .sphere-thinking .core-energy { background: #A855F7; opacity: 0.7; animation: pulseThink 1s infinite alternate; }
        .sphere-speaking { animation: floatSpeak 2.5s ease-in-out infinite; box-shadow: inset -10px -10px 25px rgba(0,0,0,0.9), inset 5px 5px 20px rgba(255,255,255,0.2), 0 0 40px rgba(0, 229, 255, 0.4); }
        .sphere-speaking .core-energy { background: #00E5FF; opacity: 1; animation: pulseSpeak 0.4s infinite alternate; }
        @keyframes floatIdle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes floatListen { 0%, 100% { transform: translateY(-5px); } 50% { transform: translateY(-15px); } }
        @keyframes floatThink { 0%, 100% { transform: translateY(-5px); } 50% { transform: translateY(-12px); } }
        @keyframes floatSpeak { 0%, 100% { transform: translateY(-8px); } 50% { transform: translateY(-20px); } }
        @keyframes pulseThink { 0% { transform: scale(0.95); filter: hue-rotate(-15deg) blur(15px); } 100% { transform: scale(1.05); filter: hue-rotate(15deg) blur(20px); } }
        @keyframes pulseSpeak { 0% { transform: scale(0.9); opacity: 0.8; } 100% { transform: scale(1.15); opacity: 1; } }

        .ambient-bg { background-color: #030712; overflow: hidden; }
        .mesh-bg { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: radial-gradient(at 0% 0%, rgba(59, 130, 246, 0.15) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(168, 85, 247, 0.1) 0px, transparent 50%); z-index: 0; pointer-events: none; }
        .glass-panel { background-color: rgba(17, 24, 39, 0.5); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); }
        .premium-btn { background: linear-gradient(135deg, #3B82F6, #2563EB); color: white; border: none; box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.5); transition: all 0.3s ease; }
        .premium-btn:hover { box-shadow: 0 15px 35px -5px rgba(59, 130, 246, 0.6); }
        .tracking-widest { letter-spacing: 0.1em; }
        
        .badge-glass { background-color: rgba(255,255,255,0.1); color: #fff; border: 1px solid rgba(255,255,255,0.1); }
        .badge-glass-info { background-color: rgba(0, 229, 255, 0.1); color: #00E5FF; border: 1px solid rgba(0, 229, 255, 0.2); }
        .badge-glass-danger { background-color: rgba(239, 68, 68, 0.1); color: #EF4444; border: 1px solid rgba(239, 68, 68, 0.2); }
        .badge-glass-purple { background-color: rgba(168, 85, 247, 0.1); color: #C084FC; border: 1px solid rgba(168, 85, 247, 0.2); }
        
        .pulse-border { animation: pulseBorder 2s infinite; }
        @keyframes pulseBorder { 0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); } 70% { box-shadow: 0 0 0 4px rgba(239, 68, 68, 0); } 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); } }
        .pulse-icon { animation: blink 1.5s infinite; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        
        .typing-dots { display: flex; gap: 5px; padding: 2px 4px; }
        .typing-dots span { width: 6px; height: 6px; background-color: #C084FC; border-radius: 50%; animation: typingBounce 1.4s infinite ease-in-out both; }
        .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
        .typing-dots span:nth-child(2) { animation-delay: -0.16s; }
        @keyframes typingBounce { 0%, 80%, 100% { transform: scale(0); opacity: 0.3; } 40% { transform: scale(1); opacity: 1; box-shadow: 0 0 8px #C084FC; } }
        
        .animate-slide-up { animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes slideUp { from { transform: translateY(15px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}</style>
    </div>
  );
};

export default InterviewRoom;