const dns = require('dns');
dns.setDefaultResultOrder('ipv4first'); // NATIVE FETCH FAILED FIX

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 👉 CORS POLICY UPDATE: Naya Vercel URL Allow Kar Diya Hai
app.use(cors({
    origin: [
        'https://placement-portal-nhbdqqq9v.vercel.app',   // 🔥 TERA NAYA URL (Ye chalega ab)
        'https://placement-portal-three-amber.vercel.app', // Purana URL (Backup ke liye)
        'http://localhost:3000',                           // Localhost React
        'http://localhost:5173'                            // Localhost Vite
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true // Cookies/Tokens ke liye zaroori
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/questions', require('./routes/questions'));
app.use('/api/results', require('./routes/results'));
app.use('/api/interview', require('./routes/interview')); // AI Interview Route

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected Successfully'))
    .catch((err) => console.log('❌ MongoDB Connection Error:', err));

// Test Route
app.get('/', (req, res) => {
    res.send('Placement Portal Server is Running Smoothly! 🚀');
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});