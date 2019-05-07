const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Project = new Schema({
  id: String,
  name: String,
  allocated: Number,
  spent: Number,
  createdAt: Date,
  updatedAt: Date,
  didNotify: Boolean
});

module.exports = mongoose.model("project", Project)
