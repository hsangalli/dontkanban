new Vue({
  el: '#app',
  data: {
    newTask: {
      description: '',
      color: ''
    },
    toDoList: [],
    doingList: [],
    doneList: []
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
      this.toDoList.push(this.newTask);
    },
    getCurrentListOf: function(task){
      if (this.toDoList.indexOf(task) > -1) {
        return this.toDoList;
      } else if (this.doingList.indexOf(task) > -1) {
        return this.doingList;
      } else if (this.doneList.indexOf(task) > -1) {
        return this.doneList;
      } else {
        return null;
      }
    },
    getNextListOf: function(list){
      switch (list) {
        case this.toDoList:
        return this.doingList;
        break;
        case this.doingList:
        return this.doneList;
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
      const indexOfTask = this.doneList.indexOf(task);
      this.doneList.splice(indexOfTask, 1);
    }
  }
})
