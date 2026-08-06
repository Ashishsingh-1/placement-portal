const dns = require('dns');
dns.setDefaultResultOrder('ipv4first'); // NATIVE FETCH FAILED FIX

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 👉 CORS POLICY UPDATE: Allowing Vercel and Localhost explicitly
app.use(cors({
    origin: [
        'https://placement-portal-three-amber.vercel.app', // Tera Vercel Frontend
        'http://localhost:3000',                           // Localhost React
        'http://localhost:5173'                            // Localhost Vite
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true // Agar cookies/tokens bhej raha hai toh ye zaroori hai
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