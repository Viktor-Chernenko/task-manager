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
            @removeTask="removeTaskEmit"
            >{{ task }}</list-item
        >
    </ul>
</template>

<script>
import { useRemoveTask } from "../../compositions/tasks-manager/delete-task";
import { isNumber, isString } from "../../utils/data-type-check";

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
        removeTask({ indexTask, idCategory }) {
            const isCorrectIndex = isNumber(indexTask);
            const isCorrectIdCategory =
                isString(idCategory) && idCategory.length;

            return isCorrectIndex && isCorrectIdCategory;
        },
    },

    setup(props, { emit }) {
        /**
         * API Удаление задач.
         */

        const { removeTaskEmit } = useRemoveTask(emit);

        return {
            removeTaskEmit,
        };
    },
};
</script>
