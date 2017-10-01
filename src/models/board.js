const mongoose = require('mongoose')
const Schema = mongoose.Schema

const boardSchema = new Schema({
  title: String,
  tasks: []
})

module.exports = mongoose.model('Board', boardSchema)
