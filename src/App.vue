<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  font-family: 'Open Sans';
  height: 100vh;
  width: 100vw;
}

#app h1 {
  font-size: 2.5em;
}

#app h4 {
  font-size: 1.25em;
}
</style>
