const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 🔥 BRAHMASTRA CORS FIX (All Origins Allowed)
app.use(cors({
    origin: function (origin, callback) {
        callback(null, true); 
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true
}));

// ✅ EXPRESS 5 CRASH FIX: '*' hata kar Regex /^.*/ laga diya
app.options(/^.*/, cors());

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
    res.send('Placement Portal Server is Running (CORS FULLY UNLOCKED) 🚀');
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});