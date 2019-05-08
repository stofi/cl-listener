const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Project = new Schema({
  id: String,
  createdAt: Date,
  updatedAt: Date,
  name: String,
  allocated: Number,
  spent: Number,
  activity: String,
  person: String,
  task: String,
  didNotify: Boolean,

});

module.exports = {
  Project: mongoose.model("project", Project)
}
