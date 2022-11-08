<template>
    <li
        class="list-group-item py-3 d-flex flex-column rounded"
        :class="{ 'mb-2': notLastItemCheck }"
    >
        <template v-if="isShowEditForm">
            <form
                @submit.prevent="
                    emitEditedTask({
                        indexTask: index,
                        idCategory,
                        editableTask,
                    })
                "
            >
                <label class="form-label me-3">
                    <span class="d-block mb-2">Заголовок</span>
                    <input
                        v-model="editableTask.title"
                        type="text"
                        class="form-control bg-white text-dark"
                    />
                </label>

                <label class="form-label me-3">
                    <span class="d-block mb-2">Описание</span>
                    <input
                        v-model="editableTask.description"
                        type="text"
                        class="form-control bg-white text-dark"
                    />
                </label>

                <button
                    type="submit"
                    class="btn btn-primary"
                    :disabled="!isFilledRequiredFields"
                >
                    Сохранить
                </button>
            </form>
        </template>
        <template v-else>
            <div class="mb-3">
                <div class="d-flex mb-3">
                    <h5 class="fw-bold me-4">{{ task.title }}</h5>
                    <span class="ms-auto"
                        >Дата создания:
                        <span class="text-info fw-bold">{{
                            task.createData
                        }}</span></span
                    >
                </div>
                <p>{{ task.description }}</p>
            </div>
            <div class="d-flex">
                <delete-task
                    class="btn btn-danger ms-auto"
                    :index-task="index"
                    @click="emitDeleteTask({ indexTask: index, idCategory })"
                />
                <edit-task
                    v-if="tasksCatagoriesIds.new === idCategory"
                    class="btn btn-primary ms-3"
                    :index-task="index"
                    @click="showEditForm(task)"
                />
                <change-category-task
                    v-if="tasksCatagoriesIds.ready !== idCategory"
                    class="btn-secondary ms-3"
                    @click="
                        changeCategoriesTask(nextCategoryId, idCategory, index)
                    "
                    >{{ textBtnChangeCatagoriesTask }}</change-category-task
                >
            </div>
        </template>
    </li>
</template>

<script>
import { toRefs } from "vue";
import { useTasksLists } from "@/composables/tasks-manager/lists-tasks";
import { useListTasksItem } from "@/composables/tasks-manager/lists-tasks/list-tasks/list-tasks-item";
import { useEditTask } from "@/composables/tasks-manager/edit-task";
import { useDeleteTask } from "@/composables/tasks-manager/delete-task";

import DeleteTask from "../DeleteTask/Main";
import EditTask from "../EditTask/Main";
import ChangeCategoryTask from "../CategoriesTasks/Buttons/Change";
import { isNumber } from "@/utils/data-type-check";

export default {
    components: {
        DeleteTask,
        EditTask,
        ChangeCategoryTask,
    },

    props: {
        idCategory: {
            type: String,
            required: true,
            default: "",
        },

        task: {
            type: Object,
            required: true,
            default: () => ({}),
        },

        numberOfAllTasks: {
            type: Number,
            required: true,
            default: 0,
        },

        index: {
            type: Number,
            required: true,
            default: 0,
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
        /** data */

        const { numberOfAllTasks, idCategory, index } = toRefs(props);

        /**
         * API список задач.
         */

        const { tasksCatagoriesIds } = useTasksLists();

        /**
         * API элемент списка задач.
         */

        const {
            nextCategoryId,
            textBtnChangeCatagoriesTask,
            notLastItemCheck,
        } = useListTasksItem(
            tasksCatagoriesIds,
            idCategory.value,
            numberOfAllTasks,
            index
        );

        /**
         * API изменения задачи.
         */

        const {
            isFilledRequiredFields,
            emitEditedTask,
            showEditForm,
            isShowEditForm,
            editableTask,
        } = useEditTask(emit);

        /**
         * API удаление задачи.
         */

        const { emitDeleteTask } = useDeleteTask(emit);

        return {
            notLastItemCheck,
            tasksCatagoriesIds,
            nextCategoryId,
            textBtnChangeCatagoriesTask,

            isFilledRequiredFields,
            emitEditedTask,
            showEditForm,
            isShowEditForm,
            editableTask,

            emitDeleteTask,
        };
    },
};
</script>
