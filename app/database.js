const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI || "mongodb://localhost"

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  dbName: 'cl-test-db'
});

module.exports = mongoose.connection
