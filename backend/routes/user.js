const express = require('express');
const { loginUser, signupUser } = require('../controllers/userController');
const router = express.Router();

// Correct POST route for signup
router.post('/signup', signupUser);

// Correct POST route for login
router.post('/login', loginUser);

module.exports = router;
