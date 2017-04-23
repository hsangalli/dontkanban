const express = require('express');
const app = express();
const bodyParser = require('body-parser');

var database = {};
var kanban = {};

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/:kanban', (req, res) => {
  res.render('kanban', {tasks: kanban.tasks.todo});
});

app.post('/enter', (req, res) => {
  kanban = {
    title: req.body.title,
    tasks: {
      todo: [],
      doing: [],
      done: []
    }
  };
  res.redirect('/' + kanban.title);
});

app.post('/add', (req, res) => {
  kanban.tasks.todo.push(req.body.task);
  res.redirect('/' + kanban.title);
});


app.listen(3000, () => {
  console.log('Server rodando em http://localhost:3000/');
});
