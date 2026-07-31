import React, { useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [formData, setFormData] = useState({
    category: 'Aptitude',
    topic: 'Quantitative',
    difficulty: 'Medium',
    questionText: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: '',
    explanation: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Options ko array mein convert karna backend ke liye
    const optionsArray = [formData.optionA, formData.optionB, formData.optionC, formData.optionD];
    
    const finalData = {
      category: formData.category,
      topic: formData.topic,
      difficulty: formData.difficulty,
      questionText: formData.questionText,
      options: optionsArray,
      correctAnswer: formData.correctAnswer,
      explanation: formData.explanation
    };

    try {
      await axios.post('http://localhost:5000/api/questions/add', finalData);
      setMessage('✅ Question added successfully!');
      
      // Form ko clear kar dena (Taaki agla question add kar sakein)
      setFormData({
        ...formData,
        questionText: '',
        optionA: '', optionB: '', optionC: '', optionD: '',
        correctAnswer: '', explanation: ''
      });
      
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error(error);
      setMessage('❌ Failed to add question.');
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow border-0">
            <div className="card-header bg-danger text-white text-center">
              <h4 className="mb-0 fw-bold">Admin Panel: Add New Question</h4>
            </div>
            
            <div className="card-body p-4">
              {message && <div className={`alert ${message.includes('✅') ? 'alert-success' : 'alert-danger'}`}>{message}</div>}

              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-4">
                    <label className="fw-bold">Category</label>
                    <select className="form-select" name="category" value={formData.category} onChange={handleChange}>
                      <option value="Aptitude">Aptitude</option>
                      <option value="Logical Reasoning">Logical Reasoning</option>
                      <option value="Technical">Technical</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="fw-bold">Topic</label>
                    <input type="text" className="form-control" name="topic" value={formData.topic} onChange={handleChange} required placeholder="e.g. Time & Work" />
                  </div>
                  <div className="col-md-4">
                    <label className="fw-bold">Difficulty</label>
                    <select className="form-select" name="difficulty" value={formData.difficulty} onChange={handleChange}>
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="fw-bold">Question Text</label>
                  <textarea className="form-control" name="questionText" rows="3" value={formData.questionText} onChange={handleChange} required placeholder="Type the question here..."></textarea>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6 mb-2">
                    <label className="fw-bold text-secondary">Option A</label>
                    <input type="text" className="form-control" name="optionA" value={formData.optionA} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6 mb-2">
                    <label className="fw-bold text-secondary">Option B</label>
                    <input type="text" className="form-control" name="optionB" value={formData.optionB} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6 mb-2">
                    <label className="fw-bold text-secondary">Option C</label>
                    <input type="text" className="form-control" name="optionC" value={formData.optionC} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6 mb-2">
                    <label className="fw-bold text-secondary">Option D</label>
                    <input type="text" className="form-control" name="optionD" value={formData.optionD} onChange={handleChange} required />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="fw-bold text-success">Correct Answer (Must match exactly with one of the options)</label>
                  <input type="text" className="form-control border-success" name="correctAnswer" value={formData.correctAnswer} onChange={handleChange} required placeholder="e.g. 15 days" />
                </div>

                <div className="mb-4">
                  <label className="fw-bold text-info">Explanation / Solution</label>
                  <textarea className="form-control border-info" name="explanation" rows="3" value={formData.explanation} onChange={handleChange} placeholder="Step by step solution..."></textarea>
                </div>

                <button type="submit" className="btn btn-danger w-100 fw-bold fs-5 shadow-sm">
                  Save Question to Database
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;