const express = require('express');
const router = express.Router();
const Result = require('../models/Result');

// POST API: Quiz ka score save karne ke liye
router.post('/save', async (req, res) => {
    try {
        // 'email' ki jagah seedha 'userId' receive karenge
        const { userId, score, totalQuestions, category } = req.body;

        // Student ka result seedha database mein save karna (Bina extra query ke)
        const newResult = new Result({
            user: userId, // Tere schema ke hisaab se field ka naam 'user' hai
            score,
            totalQuestions,
            category
        });

        await newResult.save();
        res.status(201).json({ message: 'Score saved successfully!' });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

// GET API: Dashboard ke liye user ke purane scores mangwana
router.get('/:userId', async (req, res) => {
    try {
        // Seedha userId se search karenge, fast query execution
        const results = await Result.find({ user: req.params.userId }).sort({ attemptedAt: -1 });
        res.json(results);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;