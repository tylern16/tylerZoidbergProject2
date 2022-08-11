const mongoose = require('mongoose')


const dogSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: String,
})

const Dog = mongoose.model('Dog', dogSchema)//Cart has to be capitalized

module.exports = Dog;
