const mongoose = require('mongoose')
const Task = require('./taskSchema.js')


const engineerSchema = new mongoose.Schema({
  name: {type: String, required: true},
  tasks: [Task.schema]
})

const Engineer = mongoose.model('Engineer', engineerSchema)//Engineer has to be capitalized

module.exports = Engineer;
