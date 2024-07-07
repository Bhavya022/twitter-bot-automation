const express = require('express');
const { getTasks, createTask } = require('../controllers/taskController');

console.log('getTasks:', getTasks);
console.log('createTask:', createTask); // Ensure this logs a function, not undefined or null

const router = express.Router();

router.get('/', getTasks);
router.post('/', createTask);

module.exports = router;
