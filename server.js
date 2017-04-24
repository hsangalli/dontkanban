const express = require('express')
const app = express()
const bodyParser = require('body-parser')

var kanban = {title: '', tasks: {todo: [], doing: [], done: []}}

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.send('Index')
})

app.listen(1234, () => {
  console.log('Server rodando em http://localhost:1234/')
})
