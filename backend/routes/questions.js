const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// 1. GET API: Quiz ke liye Random Questions
router.get('/random', async (req, res) => {
    try {
        const randomQuestions = await Question.aggregate([{ $sample: { size: 10 } }]);
        res.json(randomQuestions);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// 2. GET API: Preparation Page ke liye
router.get('/', async (req, res) => {
    try {
        const { category, topic, difficulty } = req.query;
        let query = {};
        
        if (category && category !== 'All') query.category = category;
        if (topic && topic !== 'All') query.topic = topic;
        // NAYI LINE: Difficulty filter add kiya
        if (difficulty && difficulty !== 'All') query.difficulty = difficulty; 
        
        const questions = await Question.find(query);
        res.json(questions);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// 3. POST API: Admin panel se naye questions add karne ke liye
router.post('/add', async (req, res) => {
    try {
        const { category, topic, difficulty, questionText, options, correctAnswer, explanation } = req.body;
        const newQuestion = new Question({ 
            category, topic, difficulty, questionText, options, correctAnswer, explanation 
        });
        await newQuestion.save();
        res.status(201).json({ message: 'Question added successfully!' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;