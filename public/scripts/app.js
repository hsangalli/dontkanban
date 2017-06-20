new Vue({
  el: '#app',
  data: {
    kanban: {
      title: '',
      tasks: []
    },
    newTask: {
      column: 1,
      description: '',
      color: ''
    }
  },
  methods: {
    checkIfEnterWasPressed: function(event){
      event = event || window.event;
      if (event.keyCode == 13) {
        this.addTask();
        this.newTask = {column: 1};
      }
    },
    addTask: function(){
      const path = location.pathname;
      const colors = ['blue', 'orange', 'purple', 'red', 'yellow'];
      const randomNumber = Math.floor((Math.random() * colors.length));
      this.newTask.color = colors[randomNumber];
      this.kanban.tasks.push(this.newTask);
      this.$http.post('/add-task', this.newTask, {headers: {'Content-Type': 'application/json'}});
    },
    moveTask: function(task){
      const indexOfTask = this.kanban.tasks.indexOf(task);
      this.kanban.tasks[indexOfTask].column += 1;
      this.$http.post('/move-task', data, {headers: {'Content-Type': 'application/json'}});
    },
    removeTask: function(task){
      const indexOfTask = this.kanban.tasks.indexOf(task);
      tihs.kanban.tasks.splice(indexOfTask, 1);
    }
  },
  mounted: function(){
    const path = location.pathname;
    const kanbanTitle = path.slice(1);
    this.kanban.title = kanbanTitle;
    this.$http.get(path + '/fetch-data').then(function(kanbanDocument){
      if (kanbanDocument.body[0]) {
        this.kanban = kanbanDocument.body[0];
      } else {
        this.$http.post('/create-kanban', this.kanban, {headers: {'Content-Type': 'application/json'}});
      }
    });
  }
});
