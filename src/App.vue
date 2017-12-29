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

.blue { background: rgb(52, 152, 219); }
.green { background: rgb(46, 204, 113); }
.orange { background: rgb(248, 148, 6); }
.pink { background: rgb(246, 36, 89); }
.purple { background: rgb(155, 89, 182); }
.red { background: rgb(231, 76, 60); }
.yellow { background: rgb(241, 196, 15); }
</style>
