const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
  boardId: Schema.ObjectId,
  column: Number,
  description: String,
  color: String
})

module.exports = mongoose.model('Task', taskSchema)
