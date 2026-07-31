const Question = require('../models/Question');

exports.getQuestions = async (req, res) => {
    try {
        // Query params se filters nikalna (agar frontend ne bheje hain toh)
        const { category, topic, difficulty } = req.query;
        
        // Filter object banana
        let query = {};
        if (category) query.category = category;
        if (topic) query.topic = topic;
        if (difficulty) query.difficulty = difficulty;

        // Database se questions fetch karna
        const questions = await Question.find(query);
        res.status(200).json(questions);
    } catch (err) {
        console.error("Error fetching questions:", err);
        res.status(500).json({ message: 'Server Error while fetching questions' });
    }
};