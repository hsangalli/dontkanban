new Vue({
  el: '#app',
  data: {
    kanban: {
      title: '',
      tasks: {
        todo: [],
        doing: [],
        done: []
      }
    },
    newTask: {
      description: '',
      color: ''
    }
  },
  methods: {
    checkIfEnterWasPressed: function(event){
      event = event || window.event;
      if (event.keyCode == 13) {
        this.addTask();
        this.newTask = {};
      }
    },
    addTask: function(){
      const path = location.pathname;
      const colors = ['blue', 'orange', 'purple', 'red', 'yellow'];
      const randomNumber = Math.floor((Math.random() * colors.length));
      this.newTask.color = colors[randomNumber];
      this.kanban.tasks.todo.push(this.newTask);
      this.$http.post('/add-task', this.newTask, {headers: {'Content-Type': 'application/json'}});
    },
    getCurrentListOf: function(task){
      if (this.kanban.tasks.todo.indexOf(task) > -1) {
        return this.kanban.tasks.todo;
      } else if (this.kanban.tasks.doing.indexOf(task) > -1) {
        return this.kanban.tasks.doing;
      } else if (this.kanban.tasks.done.indexOf(task) > -1) {
        return this.kanban.tasks.done;
      } else {
        return null;
      }
    },
    getNextListOf: function(list){
      switch (list) {
        case this.kanban.tasks.todo:
        return this.kanban.tasks.doing;
        break;
        case this.kanban.tasks.doing:
        return this.kanban.tasks.done;
        break;
        default:
        return null;
      }
    },
    moveTask: function(task){
      const currentList = this.getCurrentListOf(task);
      const nextList = this.getNextListOf(currentList);
      const indexOfTask = currentList.indexOf(task);
      const taskToBeMoved = currentList[indexOfTask];
      currentList.splice(indexOfTask, 1);
      nextList.push(task);
      const data = { "currentList": currentList, "nextList": nextList, "taskToBeMoved": taskToBeMoved };
      this.$http.post('/move-task', data, {headers: {'Content-Type': 'application/json'}});
    },
    removeTask: function(task){
      const currentList = this.getCurrentListOf(task);
      const indexOfTask = currentList.indexOf(task);
      currentList.splice(indexOfTask, 1);
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
