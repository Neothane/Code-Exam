<template>
  <div>
    <img alt="Vue logo" src="../assets/do-it-now.png" />
    <h1>
      List Of Items To-Do
      <button type="button" @click="load()">Reload</button>
    </h1>
    <div v-if="edit">
      <label v-if="edit.id == undefined">New Task: </label>
      <label v-if="edit.id != undefined">Edit Task {{ edit.id }}: </label>
      <input
        type="text"
        :value="edit.task"
        @input="(event) => (edit.task = event.target.value)"
      />
      <button type="button" @click="save()">Save</button>
      <button type="button" @click="edit = null">Clear</button>
    </div>
    <div v-if="!edit">
      <button type="button" @click="edit = { id: undefined, task: '' }">
        Add New Task
      </button>
    </div>
    <table>
      <thead>
        <tr>
          <th class="id-col">Id</th>
          <th>Task</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(todo, index) in todos" :key="index">
          <td class="id-col">{{ todo.id }}</td>
          <td>{{ todo.task }}</td>
          <td>
            <button
              type="button"
              @click="edit = { id: todo.id, task: todo.task }"
            >
              Edit
            </button>
          </td>
          <td>
            <button type="button" @click="remove(todo)">Remove</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ToDoList",
  data() {
    return {
      edit: null,
      todos: [],
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      this.todos = [];
      axios
        .get("http://localhost:8081/api/todo")
        .then((result) => {
          console.log(result.data);
          this.todos = (result.data && result.data.todos) || [];
        })
        .catch((error) => console.log(error));
    },
    save() {
      console.log(this.edit);
    },
    remove(todo) {
      let i = this.todos.findIndex((t) => t.id == todo.id);
      if (i >= 0) this.todos.splice(i, 1);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  width: 100px;
  height: 100px;
}

table {
  border: 1px solid black;
  margin-top: 5px;
  width: 900px;
}

td {
  padding: 5px 0;
}

.id-col {
  width: 50px;
  padding-left: 10px;
}

input {
  min-width: 600px;
  margin-right: 10px;
}

button {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
