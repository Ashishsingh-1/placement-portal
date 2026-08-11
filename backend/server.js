const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // 👉 CORS wapas add kar diya
require('dotenv').config();

const app = express();

// 🔥 THE ULTIMATE CORS FIX (Ye apne aap har Vercel URL ko allow karega)
app.use(cors({
    origin: true, 
    credentials: true
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/questions', require('./routes/questions'));
app.use('/api/results', require('./routes/results'));
app.use('/api/interview', require('./routes/interview')); 

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected Successfully'))
    .catch((err) => console.log('❌ MongoDB Connection Error:', err));

// Test Route
app.get('/', (req, res) => {
    res.send('Placement Portal Server is Running (ULTIMATE CORS & PORT UNLOCKED) 🚀');
});

// 🔥 Server Start (Render Port Fix '0.0.0.0' ke sath)
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});