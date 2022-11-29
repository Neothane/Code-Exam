<script>
let id = 0;

export default {
  name: "TodoList",
  data() {
    return {
        newTodo: "",
        todos: []
    }
  },
  methods: {
    async getTodos() {
        const response = await fetch(
            "https://illfatedlavendermemoryallocator--jabez007.repl.co/api/todo", {
                method: "GET",
                headers: {
                    "Content-Type": "text/plain;charset=UTF-8"
                },
                mode: "cors",
                credentials: "include"
            }
        );
        const todoList = response.getData().todos;
        this.todos = todoList;
        id = Math.max(this.todos.map(todo => todo.id ));
    },
    async createTodo() {
        const data = {
            task: this.newTodo
        }
        await fetch(
            "https://illfatedlavendermemoryallocator--jabez007.repl.co/api/todo", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "text/plain;charset=UTF-8"
                },
                mode: "cors",
                credentials: "include"
            }
        );
        this.addTodo();
    },
    async updateTodo(todo) {
        const data = {
            task: todo.task
        }
        await fetch(
            `https://illfatedlavendermemoryallocator--jabez007.repl.co/api/todo/:${todo.id}`, {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "text/plain;charset=UTF-8"
                },
                mode: "cors",
                credentials: "include"
            }
        );
    },
    async deleteTodo(todo) {
        await fetch(
            `https://illfatedlavendermemoryallocator--jabez007.repl.co/api/todo/:${todo.id}`, {
                method: "DELETE",
                mode: "cors",
                credentials: "include"
            }
        );
        this.removeTodo(todo);
    },
    addTodo() {
        this.todos.push({ id: id++, task: this.newTodo });
        this.newTodo = "";
    },
    removeTodo(todo) {
        this.todos = this.todos.filter((todoItem) => todoItem !== todo);
    }
  }
}
</script>

<template>
    <div>
        <form @submit.prevent="createTodo">
            <input v-model="newTodo">
            <button>Add item</button>
        </form>
        <ul style="list-style-type:none">
            <li v-for="todo in todos" :key="todo.id">
                <input v-model="todo.task">
                <button @click="updateTodo(todo)">Update</button>
                <button @click="deleteTodo(todo)">Remove</button>
            </li>
        </ul>
        <button @click="getTodos">Populate to do list</button>
    </div>
</template>