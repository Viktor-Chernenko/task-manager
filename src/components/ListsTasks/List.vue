<template>
    <ul class="list-group">
        <list-item
            v-for="(task, index) in tasks"
            :key="index"
            :index="index"
            :task="task"
            :number-of-all-tasks="tasks.length"
            :id-category="idCategory"
            :change-categories-task="changeCategoriesTask"
            :remove-task="removeTask"
            >{{ task }}</list-item
        >
    </ul>
</template>

<script>
import ListItem from "./ListItem";

export default {
    components: {
        ListItem,
    },

    props: {
        tasks: {
            type: Array,
            required: true,
            default: () => [],
        },

        idCategory: {
            type: String,
            required: true,
            default: "",
        },

        changeCategoriesTask: {
            type: Function,
            required: true,
            default: () => {},
        },

        removeTask: {
            type: Function,
            required: true,
            default: () => {},
        },
    },
};
</script>
