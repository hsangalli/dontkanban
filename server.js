const express = require('express')
const app = express()
const bodyParser = require('body-parser')

var database = []

app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine' , 'ejs')

app.get('/', (req, res) => {
  
})

app.get('/:kanban', (req, res) => {

})

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000/')
})
