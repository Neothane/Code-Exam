<script>
let id = 0;

export default {
  name: 'TodoList',
  data() {
    return {
        newTodo: "",
        todos: [
            { id: id++, task: "Eat delicious Pakistani food" },
            { id: id++, task: "Eat delicious Thai food" },
            { id: id++, task: "Eat delicious Pakistani food" }
        ]
    }
  },
  methods: {
    addTodo() {
        this.todos.push({ id: id++, task: this.newTodo });
        this.newTodo = "";
    },
    removeTodo(todo) {
        this.todos = this.todos.filter((todoItem) => todoItem !== todo);
    },
    async getData() {
        const response = await fetch(
            "https://illfatedlavendermemoryallocator--jabez007.repl.co/api/todo", {
                method: "GET",
                mode: "no-cors"
            }
        );
        console.log(await response);
    },
    async putData() {
        await fetch(
            "https://illfatedlavendermemoryallocator--jabez007.repl.co/api/todo", {
                method: "PUT"
            }
        );
    },
    async postData() {
        const data = {
            task: "test-task"
        }
        await fetch(
            "https://illfatedlavendermemoryallocator--jabez007.repl.co/api/todo", {
                method: "POST",
                mode: "cors",
                body: JSON.stringify(data)
            }
        );
    },
    async deleteData() {

    }
  }
}
</script>

<template>
    <div>
        <h1>Your todo list</h1>
        <form @submit.prevent="addTodo">
            <input type="text" v-model="newTodo">
            <button>Add item</button>
        </form>
        <ul style="list-style-type:none">
            <li v-for="todo in todos" :key="todo.id">
                <span>{{ todo.task }}</span>
                <button @click="removeTodo(todo)">Remove</button>
            </li>
        </ul>
        <h2>Operations</h2>
        <button @click="getData">GET</button>
        <button @click="postData">POST</button>
        <button @click="putData">PUT</button>
        <button @click="deleteData">DELETE</button>
    </div>
</template>