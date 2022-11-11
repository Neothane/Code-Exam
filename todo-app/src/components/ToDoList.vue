<template>
  <div>
    <h1>
      <img alt="Vue logo" src="../assets/do-it-now.png" />
      List Of Items To-Do
      <button class="info" type="button" @click="load()" :disabled="saving">
        Reload
      </button>
    </h1>

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
              class="info"
              type="button"
              @click="edit = { id: todo.id, task: todo.task }"
              :disabled="saving"
            >
              Edit
            </button>
          </td>
          <td>
            <button
              class="danger"
              type="button"
              @click="remove(todo)"
              :disabled="saving"
            >
              Remove
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <button
      class="fadeIn success"
      type="button"
      v-if="!edit"
      @click="edit = { task: '' }"
      :disabled="saving"
    >
      Add New Task
    </button>
    <form class="fadeIn" v-if="edit">
      <label v-if="edit.id == undefined">New Task: </label>
      <label v-if="edit.id != undefined">Edit Task {{ edit.id }}: </label>
      <input
        type="text"
        :value="edit.task"
        @change="edit.task = $event.target.value"
        :disabled="saving"
      />
      <button class="success" type="button" @click="save()" :disabled="saving">
        Save
      </button>
      <button
        class="info"
        type="button"
        @click="edit = null"
        :disabled="saving"
      >
        Clear
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import store from "../store";

export default {
  name: "ToDoList",
  data() {
    return {
      edit: null,
      todos: [],
      saving: false,
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    async load() {
      this.saving = true;

      const response = await axios.get("http://localhost:8081/api/todo");
      store.state.todos = this.todos =
        (response.data && response.data.todos) || [];

      this.saving = false;
      this.edit = null;
    },
    async save() {
      if (!this.edit || this.saving) return;
      this.saving = true;

      await axios.put(`http://localhost:8081/api/todo`, this.edit);

      let index = this.todos.findIndex((t) => t.id == this.edit.id);
      if (index > -1) this.todos.splice(index, 1);

      this.edit.id = this.todos[this.todos.length - 1].id + 1;
      this.todos.push(this.edit);

      this.saving = false;
      this.edit = null;
      store.state.todos = this.todos;
    },
    async remove(todo) {
      if (this.saving) return;
      this.saving = true;

      await axios.delete(`http://localhost:8081/api/todo/${todo.id}`);

      let index = this.todos.findIndex((t) => t.id == todo.id);
      this.todos.splice(index, 1);

      this.saving = false;
      this.edit = null;
      store.state.todos = this.todos;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  display: inline;
  width: 50px;
  height: 50px;
}

table {
  border: 1px solid black;
  margin-bottom: 10px;
  width: 900px;
}

th {
  padding: 5px 0;
}

td {
  padding: 5px 0;
}

.id-col {
  width: 50px;
  padding-left: 10px;
}

input {
  min-width: 650px;
  margin-right: 10px;
  border-radius: 5px;
}

button {
  margin-left: 10px;
  margin-right: 10px;
  padding: 5px 8px;
}
button:hover {
  cursor: pointer;
}

.success {
  background-color: lightgreen;
  color: black;
  border: 1px slategray solid;
  border-radius: 5px;
}
.success:hover {
  background-color: rgb(64, 189, 64);
}

.info {
  background-color: lightskyblue;
  color: black;
  border: 1px slategray solid;
  border-radius: 5px;
}
.info:hover {
  background-color: rgb(77, 169, 226);
}

.danger {
  background-color: lightcoral;
  color: black;
  border: 1px slategray solid;
  border-radius: 5px;
}
.danger:hover {
  background-color: rgb(217, 93, 93);
}

.fadeIn {
  animation: fadeIn 1.5s ease-in-out;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
