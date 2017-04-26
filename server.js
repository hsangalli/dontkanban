const express = require('express')
const app = express()
const bodyParser = require('body-parser')

var banco = [ { title: 'abc', todo: [], doing: [], done: [] } ]

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
  var kanban = { title: titulo, todo: [], doing: [], done: [] }
  if (getNumber(titulo) < 0) banco.push(kanban)

  console.log(banco)
  res.render('kanban', {kanban: kanban})
})

app.post('/adiciona', (req, res) => {
  kanban.todo.push(req.body.task)
  res.redirect('/' + kanban.title)
})

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000/')
})
