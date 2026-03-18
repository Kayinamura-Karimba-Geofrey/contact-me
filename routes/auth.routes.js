const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth.controller');
const { validateRegistration } = require('../middleware/validation.middleware');

// Register new user
router.post('/register', validateRegistration, register);

// Login user
router.post('/login', login);

module.exports = router; 