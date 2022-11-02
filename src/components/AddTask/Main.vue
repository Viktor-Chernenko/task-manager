<template>
    <h3 class="mb-3">Добавить задачу</h3>
    <form @submit.prevent="addTask">
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
import { isString } from "../../utils/data-type-check";

export default {
    emits: {
        addTask({ title, description }) {
            const isValidTitle = isString(title) && title.length;
            const isValidDescription =
                isString(description) && description.length;
            const errorMsg = "Ошибка валидации emit 'addTask'";

            if (!isValidTitle || !isValidDescription) {
                console.warn(errorMsg);
            }

            return isValidTitle && isValidDescription;
        },
    },

    setup(_, { emit }) {
        /**
         * API Добавление задач.
         */
        const { newTask, isFilledRequiredFields, addTask } = useAddTask(emit);

        return { newTask, isFilledRequiredFields, addTask };
    },
};
</script>
