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
      var data = this.newTask;
      this.$http.post(path + '/push', data, {headers: {'Content-Type': 'application/json'}}).then(function(kanbanDocument){
        //this.kanban = kanbanDocument.body[0];
        alert("Foee!");
      });
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
      currentList.splice(indexOfTask, 1);
      nextList.push(task);
    },
    removeTask: function(task){
      const currentList = this.getCurrentListOf(task);
      const indexOfTask = currentList.indexOf(task);
      currentList.splice(indexOfTask, 1);
    }
  },
  mounted: function(){
    const path = location.pathname;
    this.$http.get(path + '/pull').then(function(kanbanDocument){
      this.kanban = kanbanDocument.body[0];
    });
  }
});
