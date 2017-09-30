const express = require('express')
const mongoose = require('mongoose')
const example = require('./src/example')
const Board = require('./src/models/board')
const Task = require('./src/models/task')

mongoose.connect('mongodb://localhost/dontkanban')
const db = mongoose.connection
const Schema = mongoose.Schema

db.once('open', () => {
  console.log('Connected to MongoDB')
})

db.on('error', err => {
  console.log(err)
})

const app = express()

app.set('port', process.env.PORT || 3000)

app.get('/', (req, res) => {
  res.send(example.say())
})

app.get('/boards', (req, res) => {
  Board.find({}, (err, boards) => {
    if (err) {
      console.log(err)
    } else {
      res.send(boards)
    }
  })
})

app.get('/tasks', (req, res) => {
  Task.find({}, (err, tasks) => {
    if (err) {
      console.log(err)
    } else {
      res.send(tasks)
    }
  })
})

app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${app.get('port')}`)
})
