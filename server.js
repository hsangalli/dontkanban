const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://<dbuser>:<dbpassword>@ds117251.mlab.com:17251/kanbans', (err, database) => {
	if (err) return console.log(err)
	db = database
	app.listen(3000, () => {
		console.log("listening on 3000")
	})
})

app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine' , 'ejs')

app.get('/', (req, res) => {
  res.send('Index')
})

app.listen(3000, () => {
  console.log('Server rodando em http://localhost:3000/')
})
