const mongoose = require('mongoose')


const engineerSchema = new mongoose.Schema({
  name: {type: String, required: true}
})

const Engineer = mongoose.model('Engineer', engineerSchema)//Engineer has to be capitalized

module.exports = Engineer;
