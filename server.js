const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const example = require('./src/example')
const Board = require('./src/models/board')

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

app.get('/:board', (req, res) => {
  const boardTitle = req.params.board
  Board.find({ title: boardTitle }, (err, board) => {
    err ? console.log(err) : res.json(board)
  })
})

app.post('/:board', (req, res) => {
  const board = new Board()
  board.title = req.params.board
  board.tasks = req.body.tasks
  board.save(err => {
    err ? console.log(err) : res.send()
  })
})

app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${app.get('port')}`)
})
