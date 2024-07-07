const Account = require('../models/Account');

// Endpoint to add a new account
exports.addAccount = async (req, res) => {
  const { username,password, accessToken, accessTokenSecret } = req.body;
  const account = new Account({ username,password, accessToken, accessTokenSecret });
  await account.save();
  res.status(201).send('Account added');
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const account = await Account.findOne({ username });

    if (!account) {
      return res.status(404).json({ error: 'User not found. Redirecting to register page.' });
    }

    if (account.password !== password) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    res.status(200).json({ message: 'Login successful', account });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};