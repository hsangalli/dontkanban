const mongoose = require('mongoose')
const Schema = mongoose.Schema

const boardSchema = new Schema({
  title: String,
  tasks: []
})

const Board = mongoose.model('Board', boardSchema)

module.exports = Board
