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
                mode: "cors",
                credentials: "include",
                referrer: "unsafe-url"
            }
        );
        console.log(await response);
        response.getData()
    },
    async createTodo() {
        const data = {
            task: this.newTodo
        }
        await fetch(
            "https://illfatedlavendermemoryallocator--jabez007.repl.co/api/todo", {
                method: "POST",
                mode: "cors",
                body: JSON.stringify(data)
            }
        );
    },
    async updateTodo(todo) {
        const data = {
            task: todo.task
        }
        await fetch(
            `https://illfatedlavendermemoryallocator--jabez007.repl.co/api/todo/${todo.id}`, {
                method: "PUT",
                mode: "cors",
                body: JSON.stringify(data)
            }
        );
    },
    async deleteTodo(todo) {
        await fetch(
            `https://illfatedlavendermemoryallocator--jabez007.repl.co/api/todo/${todo.id}`, {
                method: "DELETE"
            }
        );
    }
  }
}
</script>

<template>
    <div>
        <form @submit.prevent="addTodo">
            <input type="text" v-model="newTodo">
            <button>Add item</button>
            <!---- <button @click="createTodo">Add item</button> -->
        </form>
        <ul style="list-style-type:none">
            <li v-for="todo in todos" :key="todo.id">
                <span>{{ todo.task }}</span>
                <button @click="updateTodo(todo)">Update</button>
                <button @click="deleteTodo(todo)">Remove</button>
            </li>
        </ul>
    </div>
</template>