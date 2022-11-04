<template>
    <div class="mb-5">
        <add-task-box :add-task="addTask" />
    </div>
    <div class="mb-5">
        <list-tasks
            :lists-tasks="arrayTasks"
            :change-categories-task="changeCategoriesTask"
            :remove-task="removeTask"
        />
    </div>
</template>

<script>
import { useTaskList } from "./compositions/tasks-manager/lists-tasks";

import AddTaskBox from "./components/AddTask/Main";
import ListTasks from "./components/ListsTasks/Main";

export default {
    components: {
        AddTaskBox,
        ListTasks,
    },

    setup() {
        /**
         * API Списка задач.
         */
        const { arrayTasks, addTask, removeTask, changeCategoriesTask } =
            useTaskList();

        return {
            arrayTasks,
            addTask,
            removeTask,
            changeCategoriesTask,
        };
    },
};
</script>

<style lang="sass">
@import './styles/main'
</style>
