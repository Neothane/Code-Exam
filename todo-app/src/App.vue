<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view />
</template>

<script>
import axios from "axios";
import store from "./store";

export default {
  name: "App",
  created() {
    axios.get("http://localhost:8081/api/todo").then((response) => {
      store.state.todos = (response.data && response.data.todos) || [];
    });
  },
};
</script>

<style>
html {
  height: 100vh;
  background-color: antiquewhite;
}
nav {
  padding: 10px 20px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
