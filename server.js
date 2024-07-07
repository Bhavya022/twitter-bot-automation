const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const twitterRoutes = require('./routes/twitterRoutes');

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);
app.use('/twitter', twitterRoutes);

const PORT = process.env.PORT || 3000;
//console.log(process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT} and MongoDb connected`));
  })
  .catch(error => console.error('Database connection error:', error));
