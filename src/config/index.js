module.exports = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  mongoUri: process.env.MONGO_URI || process.env.MONGODB_URI || '',
};
