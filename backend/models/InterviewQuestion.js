const mongoose = require('mongoose');

const interviewQuestionSchema = new mongoose.Schema({
    roundType: { 
        type: String, 
        required: true, 
        enum: ['HR', 'MR', 'TR'] // Sirf in 3 rounds ke liye
    },
    questionText: { 
        type: String, 
        required: true 
    },
    explanation: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});
module.exports = mongoose.model('InterviewQuestion', interviewQuestionSchema);