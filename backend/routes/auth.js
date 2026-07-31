const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const User = require('../models/User'); 

// 1. POST API: Naya student account banane ke liye (REGISTER)
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists with this email' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ name, email, password: hashedPassword });
        await user.save();
        
        const payload = {
            user: { id: user.id, role: user.role }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'secret123',
            { expiresIn: '2h' },
            (err, token) => {
                if (err) throw err;
                // ✅ FIXED: user_id return kar rahe hain
                res.status(201).json({ 
                    msg: 'User registered successfully!', 
                    token, 
                    user: { id: user._id, name: user.name, email: user.email, role: user.role } 
                });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});

// 2. POST API: Student ko login karwane ke liye (LOGIN)
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Email or Password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Email or Password' });
        }

        const payload = {
            user: { id: user.id, role: user.role }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'secret123',
            { expiresIn: '2h' },
            (err, token) => {
                if (err) throw err;
                // ✅ FIXED: user_id return kar rahe hain
                res.json({ 
                    msg: 'Logged in successfully', 
                    token, 
                    user: { id: user._id, name: user.name, email: user.email, role: user.role } 
                });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});

// 3. POST API: Bookmark Toggle karne ke liye (Add/Remove)
router.post('/bookmark', async (req, res) => {
    try {
        const { userId, questionId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isBookmarked = user.bookmarks.includes(questionId);

        if (isBookmarked) {
            user.bookmarks = user.bookmarks.filter(id => id.toString() !== questionId);
        } else {
            user.bookmarks.push(questionId);
        }

        await user.save();
        
        res.json({ 
            message: isBookmarked ? 'Bookmark removed' : 'Bookmarked successfully',
            bookmarks: user.bookmarks 
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;