const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var urlConexaoBancoDeDados = "mongodb://localhost/kanban"
var kanban = {}

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))

app.set('view engine' , 'ejs')

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

app.post('/enter', (req, res) => {
  res.redirect('/' + req.body.titulo)
})

app.get('/:titulo', (req, res) => {
  var titulo = req.params['titulo']
  MongoClient.connect(urlConexaoBancoDeDados, function(erroConexao, db) {
    if(!erroConexao) {
      var collection = db.collection(titulo)
      collection.find().toArray(function(err, items) {
        kanban = {title: titulo, todo: [], doing: [], done: []}
        for(var index in items){
          var item = items[index]
          if(item.status === "todo"){
            kanban.todo.push(item)
          } else if(item.status === "doing"){
            kanban.doing.push(item)
          } else {
            kanban.done.push(item)
          }
        }
        res.render('kanban', {kanban: kanban})
      })
    }
    else{
      res.send(erroConexao)
    }
  })
})

app.post('/adiciona', (req, res) => {
  task = req.body.task
  kanbanName = req.body.kanbanName

  MongoClient.connect(urlConexaoBancoDeDados, function(erroConexao, db) {
    if(!erroConexao) {
      var collection = db.collection(kanbanName)
      var taskObject = { description: task, status: "todo" }
      collection.insert(taskObject)
    }
  })
  res.redirect('/' + kanban.title)
})

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000/')
})
