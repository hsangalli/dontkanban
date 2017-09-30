const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
  boardId: Schema.ObjectId,
  column: Number,
  description: String,
  color: String
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task
