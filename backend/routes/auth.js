const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../config/database');

// Signup endpoint
router.post('/signup', async (req, res) => {
    try {
        const { 
            firstName,
            lastName,
            email, 
            password 
        } = req.body;
        
        // Validate required fields
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                message: 'Required fields missing'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Insert user
        const query = `
            INSERT INTO users (
                first_name, 
                last_name, 
                email, 
                password_hash,
                status,
                created_at
            ) VALUES (?, ?, ?, ?, 'pending', NOW())
        `;

        const values = [
            firstName,
            lastName,
            email,
            hashedPassword
        ];
        
        const [result] = await pool.execute(query, values);
        
        res.status(201).json({
            userId: result.insertId,
            message: 'User created successfully'
        });

    } catch (error) {
        console.error('Signup error:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                message: 'Email already exists'
            });
        }
        res.status(500).json({
            message: 'Failed to create account'
        });
    }
});

module.exports = router; 