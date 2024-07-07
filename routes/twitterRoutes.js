const express = require('express');
const { executeAllTasks, executeSingleTask } = require('../controllers/twitterController');
const router = express.Router();

// Route to execute all tasks
router.post('/execute', executeAllTasks);

// Route to execute a single task by ID
router.post('/execute/:id', executeSingleTask);

module.exports = router;
