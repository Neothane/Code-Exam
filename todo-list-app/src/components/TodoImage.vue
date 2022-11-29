<script>

export default {
    name: "TodoImage",
    data() {
        return {
            rotation: 0
        }
    },
    methods: {
        increaseRotation() {
            this.rotation = this.rotation + 90;
        }
    }
}
</script>

<template>
    <div :style="{ rotate: `${rotation}deg`}">
        <img @click="increaseRotation" alt="App image" src="../assets/journey.jpeg" style="width: 20%; height: 20%">
    </div>
</template>