<template>
  <div>
    <img alt="Vue logo" src="../assets/do-it-now.png" />
    <h1>
      List Of Items To-Do
      <button type="button" @click="load()" :disabled="saving">Reload</button>
    </h1>
    <div v-if="edit">
      <label v-if="edit.id == undefined">New Task: </label>
      <label v-if="edit.id != undefined">Edit Task {{ edit.id }}: </label>
      <input
        type="text"
        :value="edit.task"
        @input="(event) => (edit.task = event.target.value)"
      />
      <button type="button" @click="save()" :disabled="saving">Save</button>
      <button type="button" @click="edit = null" :disabled="saving">
        Clear
      </button>
    </div>
    <div v-if="!edit">
      <button type="button" @click="edit = { task: '' }">Add New Task</button>
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
              :disabled="saving"
            >
              Edit
            </button>
          </td>
          <td>
            <button type="button" @click="remove(todo)" :disabled="saving">
              Remove
            </button>
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
      saving: false,
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    async load() {
      this.todos = [];

      const response = await axios.get("http://localhost:8081/api/todo");

      this.todos = (response.data && response.data.todos) || [];
    },
    async save() {
      if (!this.edit || this.saving) return;
      this.saving = true;

      await axios.put(`http://localhost:8081/api/todo`, this.edit);

      this.saving = false;
      this.edit = null;

      await this.load();
    },
    async remove(todo) {
      if (this.saving) return;
      this.saving = true;

      await axios.delete(`http://localhost:8081/api/todo/${todo.id}`);

      this.saving = false;

      await this.load();
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
