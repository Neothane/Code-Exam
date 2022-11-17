<template>
    <notifications
        class="mt-3 ms-3"
        :duration="2000"
        :width="250"
        animation-name="v-fade-left"
        position="top left"
    />
    <div class="container my-5">
        <h2 class="text-center">VUE 3 ToDo App With Rest Api</h2>
        <div class="row d-flex justify-content-center">
            <div class="col-xs-12 col-lg-6 my-3">
                <div class="form-group mb-3">
                    <label for="todo" class="form-label">Add Task</label>
                    <div class="row">
                        <div class="col-10">
                            <input
                                v-model="task"
                                type="text"
                                class="form-control"
                                name="todo"
                                id="id"
                                placeholder="Enter New Task"
                                v-bind:class="{ 'is-invalid': input_errors.length > 0, 'is-valid': input_errors.length == 0 && task != '' }"
                            />
                            <div class="invalid-feedback">
                                <span :key="key" v-for="(error,key) in input_errors">{{ error }}</span>
                            </div>
                        </div>
                        <div class="col-2 d-grid gap-2">
                            <button class="btn btn-primary btn-s float-end" @click="save">Add</button>
                        </div>
                    </div>
                </div>
                <div class="form-group"></div>
            </div>
        </div>
        <div class="row d-flex justify-content-center mt-3" v-if="ToDos.length">
            <div class="col-md-6">
                <h5 class="mb-3">ToDo List</h5>
                <div style="list-style-type: none;">
                    <li
                        v-for="(todo,index) in ToDos"
                        v-bind:key="index"
                        class="row"
                        style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 10px 24px;
                        border-radius: 6px; 
                        margin-bottom: 12px;
                        border: 2px solid hsla(0, 0%, 0%, 0.35);                   
                        "
                    >
                        
                        <div class="col-2 d-flex justify-content-center">
                            <button class="btn btn-danger btn-sm" @click="delete_todo(todo.id)">Delete</button>
                        </div>
                    </li>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            task: "",
            ToDos: [],
            errors: [],
            newtask: {
                task: ""                
            },
            responseData: null,
            input_errors: []
        };
    },
    mounted() {
        this.getTodos();
    },
    methods: {
        async getTodos() {
            try {
                const response = await this.$axios.get("/todo");
                this.ToDos = response.data;
            } catch (error) {
                this.errors.push(error);
            }
        },
        async save() {
            if (this.input_errors.length > 0 || this.task == '') {
                if (this.task == '' && this.input_errors.length == 0)
                    this.input_errors.push('ToDo field cannot be left blank')
                this.input_errors.forEach((value) => {
                    this.$notify(value);
                });
            } else {
                try {
                    this.newTodo.task = this.task;
                    const response = await this.$axios.post("/todo", this.newtask);
                    this.responseData = response.data;
                } catch (error) {
                    this.errors.push(error);
                }
                this.getTodos();
                this.$notify("Added Succesfully");
                this.todo = "";
            }
        },
        async delete_todo(index) {
            try {
                const response = await this.$axios.delete("/todo/" + index);
                this.responseData = response.data;
            } catch (error) {
                this.errors.push(error);
            }
            this.getTodos();
            this.$notify("Deleted Succesfully");
        },    
    },
    watch: {
        todo(val) {
            this.input_errors = [];
            if (val == '') {
                this.input_errors.push('ToDo field cannot be left blank')
                return;
            }
            if (val.length < 3 || val.length > 40) {
                this.input_errors.push('ToDo field be Minimum 6, Maximum 25 characters')
                return;
            }
        }
    }
};
</script>