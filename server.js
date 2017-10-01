const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const example = require('./src/example')
const Board = require('./src/models/board')
const Task = require('./src/models/task')

mongoose.connect('mongodb://localhost/dontkanban')
const db = mongoose.connection
const Schema = mongoose.Schema

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('port', process.env.PORT || 3000)

app.get('/', (req, res) => {
  res.send(example.say())
})

app.get('/boards', (req, res) => {
  Board.find({}, (err, boards) => {
    if (err) {
      console.log(err)
    } else {
      res.json(boards)
    }
  })
})

app.post('/boards', (req, res) => {
  const board = new Board()
  board.title = req.body.title
  board.tasks = req.body.tasks
  board.save(err => {
    if (err) {
      console.log(err)
    } else {
      res.json(board)
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

app.post('/tasks', (req, res) => {
  const task = new Task()
  task.boardId = req.body.boardId
  task.column = req.body.column
  task.description = req.body.description
  task.color = req.body.color
  task.save(err => {
    if (err) {
      console.log(err)
    } else {
      res.json(task)
    }
  })
})

app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${app.get('port')}`)
})
