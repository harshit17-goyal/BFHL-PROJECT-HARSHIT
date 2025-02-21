const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// GET endpoint
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

// POST endpoint
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        
        // Process the input array
        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => isNaN(item) && item.length === 1);
        
        // Find highest alphabet (case insensitive)
        const highest_alphabet = alphabets.length > 0 
            ? [alphabets.reduce((max, current) => 
                current.toLowerCase() > max.toLowerCase() ? current : max
            )]
            : [];

        res.status(200).json({
            is_success: true,
            user_id: "john_doe_17091999", // Replace with your details
            email: "john@xyz.com", // Replace with your email
            roll_number: "ABCD123", // Replace with your roll number
            numbers: numbers,
            alphabets: alphabets,
            highest_alphabet: highest_alphabet
        });
    } catch (error) {
        res.status(500).json({
            is_success: false,
            error: "Internal server error"
        });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});