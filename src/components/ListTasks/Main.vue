<template>
    <ul class="list-group">
        <li
            v-for="(task, index) in tasks"
            :key="index"
            class="list-group-item d-flex flex-column rounded"
            :class="{ 'mb-2': notLastItemCheck(index) }"
        >
            <h5 class="fw-bold mb-3">{{ task.title }}</h5>
            <div class="d-flex">
                <p class="me-4">{{ task.description }}</p>
                <delete-task
                    class="btn btn-secondary ms-auto"
                    :index-task="index"
                    @click="removeTask(index)"
                />
            </div>
        </li>
    </ul>
</template>

<script>
import { useRemoveTask } from "../../compositions/tasks-manager/delete-task";
import { useListTasks } from "../../compositions/tasks-manager/list-tasks";
import { isNumber } from "../../utils/data-type-check";

import DeleteTask from "../DeleteTask/Main";

export default {
    components: {
        DeleteTask,
    },

    props: {
        tasks: {
            type: Array,
            required: true,
            default: () => [],
        },
    },

    emits: {
        removeTask(index) {
            const isCorrectIndex = isNumber(index);

            return isCorrectIndex;
        },
    },

    setup(props, { emit }) {
        /**
         * API Удаление задач.
         */

        const { removeTask } = useRemoveTask(emit);

        /**
         * API список задач.
         */

        const { notLastItemCheck } = useListTasks(props);

        return {
            notLastItemCheck,
            removeTask,
        };
    },
};
</script>
