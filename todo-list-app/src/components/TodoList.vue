<script>
let id = 0;

export default {
  name: 'TodoList',
  data() {
    return {
        newTodo: "",
        todoList: [
            { id: id++, text: "Eat delicious Pakistani food", done: false},
            { id: id++, text: "Eat delicious Thai food", done: false},
            { id: id++, text: "Eat delicious Pakistani food", done: false}
        ]
    }
  },
  methods: {
    addTodo() {
        this.todoList.push({ id: id++, text: this.newTodo, done: false});
        this.newTodo = "";
    },
    removeTodo(todo) {
        this.todoList = this.todoList.filter((todoItem) => todoItem !== todo);
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
            <li v-for="todo in todoList" :key="todo.id">
                <input type="checkbox" v-model="todo.done">
                <span :class="{ done: todo.done }">{{ todo.text }}</span>
                <button @click="removeTodo(todo)">Remove</button>
            </li>
        </ul>
    </div>
</template>

<style>
.done {
    text-decoration: line-through;
}
</style>