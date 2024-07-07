const Task = require('../models/Task');
const Account = require('../models/Account');
const { getClient } = require('../services/twitterService');
const logAction = require('../services/logger');

// Function to execute all tasks
const executeAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    const accounts = await Account.find();

    for (const task of tasks) {
      const randomAccount = accounts[Math.floor(Math.random() * accounts.length)];
      const client = await getClient(randomAccount.username);

      try {
        if (task.action === 'like') {
          await client.v1.post('favorites/create', { id: task.tweetId });
        } else if (task.action === 'retweet') {
          await client.v1.post('statuses/retweet/:id', { id: task.tweetId });
        } else if (task.action === 'reply') {
          await client.v1.post('statuses/update', {
            status: task.message,
            in_reply_to_status_id: task.tweetId,
          });
        }

        logAction(`Task ${task._id} executed by ${randomAccount.username}`, 'success');
      } catch (error) {
        logAction(`Failed to execute task ${task._id}: ${error.message}`, 'error');
      }
    }

    res.status(200).send('All tasks executed successfully.');
  } catch (error) {
    console.error('Error executing tasks:', error.message);
    res.status(500).send('Error executing tasks.');
  }
};

// Function to execute a single task by ID
const executeSingleTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);
    const accounts = await Account.find();
    const randomAccount = accounts[Math.floor(Math.random() * accounts.length)];
    const client = await getClient(randomAccount.username);

    if (task) {
      try {
        if (task.action === 'like') {
          await client.v1.post('favorites/create', { id: task.tweetId });
        } else if (task.action === 'retweet') {
          await client.v1.post('statuses/retweet/:id', { id: task.tweetId });
        } else if (task.action === 'reply') {
          await client.v1.post('statuses/update', {
            status: task.message,
            in_reply_to_status_id: task.tweetId,
          });
        }

        logAction(`Task ${task._id} executed by ${randomAccount.username}`, 'success');
        res.status(200).send('Task executed successfully.');
      } catch (error) {
        logAction(`Failed to execute task ${task._id}: ${error.message}`, 'error');
        res.status(500).send('Error executing task.');
      }
    } else {
      res.status(404).send('Task not found.');
    }
  } catch (error) {
    console.error('Error executing task:', error.message);
    res.status(500).send('Error executing task.');
  }
};

module.exports = { executeAllTasks, executeSingleTask };
