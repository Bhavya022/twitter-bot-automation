const { TwitterApi } = require('twitter-api-v2');
const Account = require('../models/Account');

const getClient = async (username) => {
  const account = await Account.findOne({ username });
  return new TwitterApi({
    accessToken: account.accessToken,
    accessSecret: account.accessTokenSecret,
  });
};

module.exports = { getClient };
