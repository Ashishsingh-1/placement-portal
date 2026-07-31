import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 1. Saare Components Import karna
import Navbar from './components/Navbar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import InterviewSelection from './components/InterviewSelection';
import InterviewRoom from './components/InterviewRoom';

import Auth from './components/authPages';      
import Prepare from './components/Preparation'; 
import Quiz from './components/Quiz';
import InterviewReport from './components/InterviewReport';           

const App = () => {
  return (
    <Router>
      {/* Navbar yahan lagane se wo har page par ek jaisa dikhega */}
      <Navbar />
      
      <Routes>
        {/* Purane Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        <Route path="/auth" element={<Auth />} />
        <Route path="/prepare" element={<Prepare />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/interview-report" element={<InterviewReport />} />
        {/* NAYE AI INTERVIEW ROUTES */}
        <Route path="/interview-selection" element={<InterviewSelection />} />
        <Route path="/interview-room" element={<InterviewRoom />} />
      </Routes>
    </Router>
  );
};

export default App;