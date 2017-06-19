const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const connectionURI = "mongodb://localhost/dontkanban"

var kanbanTitle = ''

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
      database.collection('kanbans').insert({
        title: "teste",
        tasks: {
          todo: [{description: "Trab", color: "red"}],
          doing: [],
          done: []
        }
      })
    }
  })
})

app.get('/drop', (req, res) => {
  MongoClient.connect(connectionURI,(connectionError, database) => {
    if(connectionError) {
      res.send(connectionError)
    } else{
      database.collection('kanbans').drop()
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
      database.collection('kanbans').find({title: kanbanTitle}).toArray((err, items) => {
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
      database.collection('kanbans').insert(req.body)
    }
  })
})

app.post('/add-task', (req, res) => {
  MongoClient.connect(connectionURI,(connectionError, database) => {
    if(connectionError) {
      res.send(connectionError)
    } else{
      database.collection('kanbans').update(
        {"title": kanbanTitle},
        {"$push": {"tasks.todo": req.body}},
        {"upsert": "true"}
      )
    }
  })
})

app.post('/move-task', (req, res) => {
  MongoClient.connect(connectionURI,(connectionError, database) => {
    if(connectionError) {
      res.send(connectionError)
    } else{
      // Nao ta funcionando como deveria!!
      // Remodelar tasks -> status, description, color
      const currentList = req.body.currentList
      const nextList = req.body.nextList
      const taskToBeMoved = req.body.taskToBeMoved
      database.collection('kanbans').update(
        {"title": kanbanTitle},
        {"$pull": {currentList: taskToBeMoved},"$push": {nextList: taskToBeMoved}},
        {"upsert": "true"}
      )
    }
  })
})

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000/')
})
