const express = require('express')
const app = express()
const bodyParser = require('body-parser')

var kanban = {title: '', tasks: {todo: [], doing: [], done: []}}
var database = []

app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine' , 'ejs')

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/:kanban', (req, res) => {
  for(var i = 0; i < database.length; i++){
    if(database[i].title == req.params['kanban']) kanban = database[i]
  }
  console.log(kanban.tasks)
  res.render('kanban', {todo: kanban.tasks.todo, doing: kanban.tasks.doing, done: kanban.tasks.done})
})

app.post('/enter', (req, res) => {
  kanban.title = req.body.kanbanName
  database.push(kanban)
  res.redirect('/' + kanban.title)
})

app.post('/add-task', (req, res) => {
  kanban.tasks.todo.push(req.body.task)
  console.log(kanban.tasks)
  res.redirect('/' + kanban.title)
})

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000/')
})
