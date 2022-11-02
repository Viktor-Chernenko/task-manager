<template>
    <div class="mb-5">
        <add-task-box @addTask="addTask" />
    </div>
    <div class="mb-5">
        <list-tasks :tasks="tasks" @removeTask="removeTask" />
    </div>
</template>

<script>
import { useTaskListChanges } from "./compositions/tasks-manager/task-list-changes";

import AddTaskBox from "./components/AddTask/Main";
import ListTasks from "./components/ListTasks/Main";

export default {
    components: {
        AddTaskBox,
        ListTasks,
    },

    setup() {
        /**
         * API Изменение списка задач.
         */
        const { tasks, addTask, removeTask } = useTaskListChanges();

        return { tasks, addTask, removeTask };
    },
};
</script>

<style lang="sass">
@import './styles/main'
</style>
