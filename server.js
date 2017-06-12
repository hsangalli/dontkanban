const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const connectionURI = "mongodb://aluno5-OptiPlex-990.local/dontkanban"

var kanbanTitle = ''
var collection = ''

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

app.get('/:kanban', (req, res) => {
  res.sendFile(__dirname + '/views/kanban.html')
})

app.get('/:kanban/pull', (req, res) => {
  MongoClient.connect(connectionURI,(connectionError, database) => {
    if(connectionError) {
      res.send(connectionError)
    } else{
      kanbanTitle = req.params['kanban']
      collection = database.collection('kanbans')
      collection.find({title: kanbanTitle}).toArray((err, items) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(JSON.stringify(items))
      })
    }
  })
})

app.post('/:kanban/push', (req, res) => {
  MongoClient.connect(connectionURI,(connectionError, database) => {
    if(connectionError) {
      res.send(connectionError)
    } else{
      console.log(JSON.stringify(req.body))
      //TODO: Insert in database
    }
  })
})

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000/')
})
