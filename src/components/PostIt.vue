<template>
  <div id="task" v-bind:class="task.color" @click="move()">
    {{ task.description }}
  </div>
</template>

<script>
export default {
  name: 'post-it',
  props: ['task'],
  methods: {
    move () {
      if (this.task.column < 3) {
        this.task.column++
      }
    }
  }
}
</script>

<style>

</style>
