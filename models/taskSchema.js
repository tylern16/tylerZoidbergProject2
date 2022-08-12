const mongoose = require('mongoose')


const taskSchema = new mongoose.Schema({
  name: {type: String, required: true},
  dueDate: {type: String, required: true},
  description: String,
  importance: {type: String, required: true},
  team: String,
  completed: Boolean
})

const Task = mongoose.model('Task', taskSchema)//Task has to be capitalized

module.exports = Task;
