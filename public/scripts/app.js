new Vue({
  el: '#app',
  data: {
    title: '',
    tasks: {
      todo: [],
      doing: [],
      done: []
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
      const colors = ['blue', 'orange', 'purple', 'red', 'yellow'];
      const randomNumber = Math.floor((Math.random() * colors.length));
      this.newTask.color = colors[randomNumber];
      this.tasks.todo.push(this.newTask);
    },
    getCurrentListOf: function(task){
      if (this.tasks.todo.indexOf(task) > -1) {
        return this.tasks.todo;
      } else if (this.tasks.doing.indexOf(task) > -1) {
        return this.tasks.doing;
      } else if (this.tasks.done.indexOf(task) > -1) {
        return this.tasks.done;
      } else {
        return null;
      }
    },
    getNextListOf: function(list){
      switch (list) {
        case this.tasks.todo:
        return this.tasks.doing;
        break;
        case this.tasks.doing:
        return this.tasks.done;
        break;
        default:
        return null;
      }
    },
    moveTask: function(task){
      const currentList = this.getCurrentListOf(task);
      const nextList = this.getNextListOf(currentList);
      const indexOfTask = currentList.indexOf(task);
      currentList.splice(indexOfTask, 1);
      nextList.push(task);
    },
    removeTask: function(task){
      const indexOfTask = this.tasks.done.indexOf(task);
      this.tasks.done.splice(indexOfTask, 1);
    },
    getKanban: function(){ // Needs to be called on page load
      const path = location.pathname;
      this.$http.get(path + '/pull').then(function(kanbanDocument){
        const kanban = kanbanDocument.body[0];
        this.title = kanban.title;
        this.tasks = kanban.tasks;
      });
    }
  }
});
