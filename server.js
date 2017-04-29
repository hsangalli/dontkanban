const express = require('express')
const app = express()
const bodyParser = require('body-parser')

var kanban = {}
<<<<<<< HEAD
var banco = [{title: 'abc', todo: [], doing: [], done: []}]
=======
var banco = [ { title: 'abc', todo: [], doing: [], done: [] } ]
>>>>>>> 7b4e8963c74a903b020b99ffc7ccdf3bfd3c9637

function getNumber (str) {
  var counter = 0
  for (var i = 0; i < banco.length; i++) {
    if (str == banco[i].title) counter++
  }
  return counter
}

app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine' , 'ejs')

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.get('/:titulo', (req, res) => {
  var titulo = req.params['titulo']
  if (getNumber(titulo) == 0) banco.push({title: titulo, todo: [], doing: [], done: []})
  kanban = banco[getNumber(titulo)]
  res.render('kanban', {kanban: kanban})
})

app.post('/adiciona', (req, res) => {
  task = req.body.task
  kanban.todo.push(task)
  banco[getNumber(kanban.title)] = kanban
  res.redirect('/' + kanban.title)
})

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000/')
})
