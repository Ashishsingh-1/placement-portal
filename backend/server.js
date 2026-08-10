const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 🔥 BRAHMASTRA CORS FIX: Preflight OPTIONS ko force-allow karega
app.use(cors({
    origin: function (origin, callback) {
        callback(null, true); // Duniya ke kisi bhi URL ko allow kar dega (0% CORS Error)
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true
}));

// Preflight request handler (Tujhe jo error aa raha hai wo exactly isi line se theek hoga)
app.options('*', cors());

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

// Test Route (Ye check karna zaroori hai update ke baad)
app.get('/', (req, res) => {
    res.send('Placement Portal Server is Running (CORS FULLY UNLOCKED) 🚀');
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});