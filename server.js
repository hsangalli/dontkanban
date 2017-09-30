const express = require('express')
const example = require('./src/example')

const app = express()

app.get('/', (req, res) => {
  res.send(example.say())
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
