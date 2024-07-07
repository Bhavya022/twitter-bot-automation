
const logAction = (message, type) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${type.toUpperCase()}]: ${message}`);
};

module.exports = logAction;
