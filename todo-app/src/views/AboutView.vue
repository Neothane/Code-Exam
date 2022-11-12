<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h3>Below are the todos that are in state:</h3>
    <ul>
      <li v-for="(todo, index) in todos" :key="index">{{ todo.task }}</li>
    </ul>
  </div>
</template>

<script>
import store from "../store";

export default {
  data() {
    return {
      todos: store.state.todos,
    };
  },
  mounted() {
    setTimeout(() => {
      this.todos = store.state.todos || [];
    }, 250);
  },
};
</script>
