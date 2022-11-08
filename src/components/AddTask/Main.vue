<template>
    <div class="accordion">
        <div class="accordion-item">
            <h3 class="accordion-header">
                <button
                    class="accordion-button collapsed fw-bold"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#add-task-collapse"
                    aria-expanded="false"
                    aria-controls="add-task-collapse"
                >
                    Добавить задачу
                </button>
            </h3>
            <div
                id="add-task-collapse"
                class="accordion-collapse collapse"
                aria-labelledby="add-task-collapse"
            >
                <div class="accordion-body">
                    <form @submit.prevent="addNewTask">
                        <label class="form-label me-3">
                            <span class="d-block mb-2">Заголовок</span>
                            <input
                                v-model="newTask.title"
                                type="text"
                                class="form-control"
                            />
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
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useAddTask } from "@/composables/tasks-manager/add-task";

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
