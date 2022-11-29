<template>
  <div>
    <TodoImage />
    <h1>Your to do list</h1>
    <TodoList />
  </div>
</template>

<script>
import TodoList from './components/TodoList.vue';
import TodoImage from './components/TodoImage.vue';

export default {
  name: 'App',
  components: {
    TodoList,
    TodoImage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
