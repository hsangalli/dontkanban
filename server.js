const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const connectionURI = "mongodb://localhost/kanban_vue"

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

app.get('/:title', (req, res) => {
  const title = req.params['title']
  MongoClient.connect(connectionURI, function(connectionError, database) {
    if(connectionError) {
      res.send(connectionError)
    } else{
      const collection = database.collection(title)
      collection.find().toArray(function(err, items) {
        res.setHeader('Content-Type', 'application/json')
        res.send(JSON.stringify(items.reverse()))
      })
    }
  })
})

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000/')
})
