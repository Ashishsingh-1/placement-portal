const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }, // Kis student ka result hai
    score: { 
        type: Number, 
        required: true 
    },
    totalQuestions: { 
        type: Number, 
        required: true 
    },
    category: { 
        type: String, 
        required: true 
    }, // e.g., 'Aptitude Quiz'
    attemptedAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Result', resultSchema);