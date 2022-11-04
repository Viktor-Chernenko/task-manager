<template>
    <h3 class="mb-3">Добавить задачу</h3>
    <form @submit.prevent="addNewTask">
        <label class="form-label me-3">
            <span class="d-block mb-2">Заголовок</span>
            <input v-model="newTask.title" type="text" class="form-control" />
        </label>

        <label class="form-label me-3">
            <span class="d-block mb-2">Описание</span>
            <input
                v-model="newTask.description"
                type="text"
                class="form-control"
            />
        </label>

        <button
            type="submit"
            class="btn btn-primary"
            :disabled="!isFilledRequiredFields"
        >
            Добавить
        </button>
    </form>
</template>

<script>
import { useAddTask } from "../../compositions/tasks-manager/add-task";

export default {
    props: {
        addTask: {
            type: Function,
            required: true,
            default: () => {},
        },
    },

    setup(props) {
        const { addTask } = props;

        /**
         * API Добавление задач.
         */
        const { newTask, isFilledRequiredFields, addNewTask } =
            useAddTask(addTask);

        return { newTask, isFilledRequiredFields, addNewTask };
    },
};
</script>
