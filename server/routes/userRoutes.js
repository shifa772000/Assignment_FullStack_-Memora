// server/routes/userRoutes.js

import express from 'express';
import User from '../models/User.js'; 
import bcrypt from 'bcryptjs'; 
import asyncHandler from 'express-async-handler'; // 💡 Required for error handling

const router = express.Router();

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // 1. Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        // Throwing error here will be caught by asyncHandler
        throw new Error('User already exists'); 
    }

    // 2. Create the user
    // Mongoose middleware (pre('save')) will handle password hashing
    const user = await User.create({
        username,
        email,
        password,
    });

    if (user) {
        // Successful creation returns 201
        res.status(201).json({
            message: 'Registration successful',
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
            },
            // Token placeholder
            token: 'TOKEN_PLACEHOLDER' 
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
}));


// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
// 💡 Wrap the function in asyncHandler for consistent error handling
router.post('/login', asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // 1. Check if user exists
    if (!user) {
        res.status(404);
        throw new Error('Email not registered.'); 
    }

    // 2. Compare password hash
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        res.status(400);
        throw new Error('Invalid password.'); 
    }

    // 3. Login success
    res.status(200).json({ 
        message: 'Login successful!', 
        user: {
            _id: user._id,
            username: user.username,
            email: user.email,
        },
        token: 'TOKEN_PLACEHOLDER'
    });
}));

export default router;