const express = require('express');
const { addAccount,login } = require('../controllers/authController');

const router = express.Router();

// Define a route for adding accounts
router.post('/add', addAccount);
router.post('/login', login);
module.exports = router;
