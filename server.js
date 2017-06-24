const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const connectionURI = "mongodb://localhost/dontkanban"

var kanbanTitle = ''

app.set('port', (process.env.PORT || 3000))
app.set('connectionURI', (process.env.MONGOLAB_URI || connectionURI))

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

app.get('/insert', (req, res) => {
  MongoClient.connect(app.get('connectionURI'), (connectionError, database) => {
    if(connectionError) {
      res.status(500).send('Database Error');
    } else{
      database.collection('kanbans').insert({
        title: "teste",
        tasks: [{description: "Trab", color: "red"}]
      })
    }
  })
})

app.get('/drop', (req, res) => {
  MongoClient.connect(app.get('connectionURI'), (connectionError, database) => {
    if(connectionError) {
      res.status(500).send('Database Error');
    } else{
      database.collection('kanbans').drop()
    }
  })
})

app.get('/:kanban', (req, res) => {
  res.sendFile(__dirname + '/views/kanban.html')
})

app.get('/:kanban/fetch-data', (req, res) => {
  MongoClient.connect(app.get('connectionURI'), (connectionError, database) => {
    if(connectionError) {
      res.status(500).send('Database Error');
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
  MongoClient.connect(app.get('connectionURI'), (connectionError, database) => {
    if(connectionError) {
      res.status(500).send('Database Error');
    } else{
      database.collection('kanbans').insert(req.body)
    }
  })
})

app.post('/add-task', (req, res) => {
  MongoClient.connect(app.get('connectionURI'), (connectionError, database) => {
    if(connectionError) {
      res.status(500).send('Database Error');
    } else{
      database.collection('kanbans').update(
        {"title": kanbanTitle},
        {"$push": {"tasks": req.body}},
        {"upsert": "true"}
      )
    }
  })
})

app.post('/move-task', (req, res) => {
  MongoClient.connect(app.get('connectionURI'), (connectionError, database) => {
    if(connectionError) {
      res.status(500).send('Database Error');
    } else{
      const taskToBeMoved = req.body
      database.collection('kanbans').update(
        {"title": kanbanTitle},
        {"$pull": {"tasks": {"description": taskToBeMoved.description}}},
        {"upsert": "true"}
      )
      database.collection('kanbans').update(
        {"title": kanbanTitle},
        {"$push": {"tasks": taskToBeMoved}},
        {"upsert": "true"}
      )
    }
  })
})

app.post('/remove-task', (req, res) => {
  MongoClient.connect(app.get('connectionURI'), (connectionError, database) => {
    if(connectionError) {
      res.status(500).send('Database Error');
    } else{
      const taskToBeRemoved = req.body
      database.collection('kanbans').update(
        {"title": kanbanTitle},
        {"$pull": {"tasks": taskToBeRemoved}},
        {"upsert": "true"}
      )
    }
  })
})

app.listen(app.get('port'), () => {
  console.log('Node app is running on port ' + app.get('port'))
})
