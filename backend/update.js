const mongoose = require('mongoose');
require('dotenv').config();
const Question = require('./models/Question');

async function updateData() {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Jin questions mein subTopic nahi hai, unhe "General" set kar do
    const result = await Question.updateMany(
        { subTopic: { $exists: false } }, 
        { $set: { subTopic: "General" } }
    );
    
    console.log(`✅ ${result.modifiedCount} questions update ho gaye!`);
    process.exit();
}

updateData();