<template>
  <div id="board">
    <header>
      <h1>Don't Kanban</h1>
    </header>
    <div class="column dashed-border">
      <h2>To do</h2>
      <post-it v-for="task in tasks" v-if="task.column === 1" :task="task" @movement="movementHandler(task, $event)"/>
    </div>
    <div class="column dashed-border">
      <h2>Doing</h2>
      <post-it v-for="task in tasks" v-if="task.column === 2" :task="task" @movement="movementHandler(task, $event)"/>
    </div>
    <div class="column">
      <h2>Done</h2>
      <post-it v-for="task in tasks" v-if="task.column === 3" :task="task" @movement="movementHandler(task, $event)"/>
    </div>
  </div>
</template>

<script>
import PostIt from '@/components/PostIt'

export default {
  name: 'board',
  components: {
    PostIt
  },
  data () {
    return {
      title: '',
      tasks: [
        {
          color: 'red',
          column: 1,
          description: 'adadad'
        }
      ]
    }
  },
  methods: {
    movementHandler (task, targetColumn) {
      task.column = targetColumn
    }
  }
}
</script>

<style>
</style>
