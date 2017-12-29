<template>
  <div id="home">
    <header>
      <h1>Don't Kanban</h1>
      <h4>Developed by <a href="https://github.com/hsangalli" target="_blank">@hsangalli</a></h4>
    </header>
    <div>
      <input type="text" placeholder="Enter your kanban's title" autofocus>
      <button type="button">Go!</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>

<style>
#home {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 80%;
  justify-content: center;
  width: 100%;
}

#home header {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 15%;
}

#home div {
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 10%;
}

#home div input {
  border: 1px solid rgba(0,0,0,0.15);
  border-radius: 4px;
  font-size: 1.1em;
  outline: none;
  margin-right: 5px;
  padding: 15px 10px;
}

#home div button {
  background-color: transparent;
  border: 1px solid rgba(0,0,0,0.15);
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1em;
  outline: none;
  padding: 15px 20px;
}
</style>
