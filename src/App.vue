<template>
    <div class="mb-5">
        <add-task-box :add-task="addTask" />
    </div>
    <div class="mb-5">
        <list-tasks
            :lists-tasks="arrayTasks"
            :change-categories-task="changeCategoriesTask"
            @deleteTask="deleteTask"
            @editedTask="updateTask"
        />
    </div>
</template>

<script>
import { useTasksLists } from "@/composables/tasks-manager/lists-tasks";

import AddTaskBox from "@/components/AddTask/Main";
import ListTasks from "@/components/ListsTasks/Main";

export default {
    components: {
        AddTaskBox,
        ListTasks,
    },

    setup() {
        /**
         * API Списка задач.
         */
        const {
            arrayTasks,
            addTask,
            deleteTask,
            updateTask,
            changeCategoriesTask,
        } = useTasksLists();

        return {
            arrayTasks,
            addTask,
            deleteTask,
            updateTask,
            changeCategoriesTask,
        };
    },
};
</script>

<style lang="sass">
@import './styles/main'
</style>
