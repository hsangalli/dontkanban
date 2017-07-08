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
    validateNewTask(){
      if (this.newTask.description.length > 0) {
        this.addTask();
        this.newTask = {column: 1};
      }
    },
    addTask(){
      const path = location.pathname;
      const colors = ['blue', 'orange', 'purple', 'red', 'yellow'];
      const randomNumber = Math.floor((Math.random() * colors.length));
      this.newTask.color = colors[randomNumber];
      this.kanban.tasks.push(this.newTask);
      this.$http.post('/' + this.kanban.title + '/add-task', this.newTask, {headers: {'Content-Type': 'application/json'}});
    },
    moveTask(task){
      const indexOfTask = this.kanban.tasks.indexOf(task);
      this.kanban.tasks.splice(indexOfTask,1);
      task.column += 1;
      this.kanban.tasks.push(task);
      this.$http.post('/' + this.kanban.title + '/move-task', task, {headers: {'Content-Type': 'application/json'}});
    },
    removeTask(task){
      const indexOfTask = this.kanban.tasks.indexOf(task);
      this.kanban.tasks.splice(indexOfTask, 1);
      this.$http.post('/' + this.kanban.title + '/remove-task', task, {headers: {'Content-Type': 'application/json'}});
    }
  },
  mounted(){
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

    const headerTitle = document.querySelector('header h1');
    headerTitle.addEventListener('click', function(){
      window.location = '/';
    });
  }
});
