<template>
    <h3 class="mb-4">
        Количество задач:
        <span class="fw-bold text-warning">{{ numberOfAllTasks }}</span>
    </h3>
    <ul class="list-group">
        <list-item
            v-for="(task, index) in tasks"
            :key="index"
            :index="index"
            :task="task"
            :number-of-all-tasks="numberOfAllTasks"
            :id-category="idCategory"
            :change-categories-task="changeCategoriesTask"
            @deleteTask="emitDeleteTask"
            @editedTask="emitEditedTask"
            >{{ task }}</list-item
        >
    </ul>
</template>

<script>
import { useEditTask } from "@/composables/tasks-manager/edit-task";
import { useDeleteTask } from "@/composables/tasks-manager/delete-task";

import { isNumber } from "@/utils/data-type-check";
import { toRefs } from "vue";
import { useListTasks } from "@/composables/tasks-manager/lists-tasks/list-tasks";
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
    },

    emits: {
        editedTask({ indexTask, idCategory, editableTask }) {
            const { title, description } = editableTask;
            const isCorrectIndexTask = isNumber(indexTask);
            const isCorrectIdCategory = idCategory.length;
            const isCorrectTitle = title.length;
            const isCorrectDescription = description.length;

            return (
                isCorrectIndexTask &&
                isCorrectIdCategory &&
                isCorrectTitle &&
                isCorrectDescription
            );
        },

        deleteTask({ indexTask, idCategory }) {
            const isCorrectIndexTask = isNumber(indexTask);
            const isCorrectIdCategory = idCategory.length;

            return isCorrectIndexTask && isCorrectIdCategory;
        },
    },

    setup(props, { emit }) {
        const { tasks } = toRefs(props);
        const { numberOfAllTasks } = useListTasks(tasks);

        /**
         * API изменения задачи.
         */

        const { emitEditedTask } = useEditTask(emit);

        /**
         * API удаление задачи.
         */

        const { emitDeleteTask } = useDeleteTask(emit);

        return { numberOfAllTasks, emitEditedTask, emitDeleteTask };
    },
};
</script>
