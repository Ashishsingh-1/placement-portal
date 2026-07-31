const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    category: { 
        type: String, 
        required: true 
    }, // e.g., 'Aptitude', 'Coding', 'Interview'
    topic: { 
        type: String, 
        required: true 
    }, // e.g., 'Quantitative', 'Logical Reasoning'
    
    difficulty: { 
        type: String, 
        enum: ['Easy', 'Medium', 'Hard'], 
        required: true 
    },
    questionText: { 
        type: String, 
        required: true 
    },
    options: [{ 
        type: String 
    }], // Multiple choice options ke liye
    correctAnswer: { 
        type: String, 
        required: true 
    },
    explanation: {
        type: String, 
        default: "" 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Question', questionSchema);