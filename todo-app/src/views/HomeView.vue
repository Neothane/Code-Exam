<template>
  <div class="home">
    <ToDoList />
  </div>
</template>

<script>
import ToDoList from "../components/ToDoList.vue";

export default {
  name: "HomeView",
  components: {
    ToDoList,
  },
};
</script>

<style>
.home {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
