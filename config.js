module.exports = {
  MONGO_URI: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@nuberdb.blsvy.mongodb.net/NuberDB?retryWrites=true&w=majority`,
  NODE_ENV: process.env.NODE_ENV,
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
};
