const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const connectionURI = "mongodb://localhost/dontkanban"

var kanbanTitle = ''
var collection = ''

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

app.get('/insert', (req, res) => {
  MongoClient.connect(connectionURI,(connectionError, database) => {
    if(connectionError) {
      res.send(connectionError)
    } else{
      collection = database.collection('kanbans')
      collection.insert({title: "teste", tasks: { todo: [ {description: "Trab", color: "red"} ], doing: [], done: [] }})
    }
  })
})

app.get('/drop', (req, res) => {
  MongoClient.connect(connectionURI,(connectionError, database) => {
    if(connectionError) {
      res.send(connectionError)
    } else{
      collection = database.collection('kanbans')
      collection.drop()
    }
  })
})

app.get('/:kanban', (req, res) => {
  res.sendFile(__dirname + '/views/kanban.html')
})

app.get('/:kanban/fetch-data', (req, res) => {
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

app.post('/create-kanban', (req, res) => {
  MongoClient.connect(connectionURI,(connectionError, database) => {
    if(connectionError) {
      res.send(connectionError)
    } else{
      console.log('creating ' + JSON.stringify(req.body));
      collection.insert(req.body)
    }
  })
})

app.post('/add-task', (req, res) => {
  MongoClient.connect(connectionURI,(connectionError, database) => {
    if(connectionError) {
      res.send(connectionError)
    } else{
      collection.update(
        {"title": kanbanTitle},
        {"$push": {"tasks.todo": req.body}},
        {"upsert": "true"}
      )
    }
  })
})

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000/')
})
