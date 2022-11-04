<template>
    <li
        class="list-group-item py-3 d-flex flex-column rounded"
        :class="{ 'mb-2': notLastItemCheck }"
    >
        <div class="mb-3">
            <div class="d-flex mb-3">
                <h5 class="fw-bold">{{ task.title }}</h5>
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
                class="btn btn-secondary ms-auto"
                :index-task="index"
                @click="removeTask({ indexTask: index, idCategory })"
            />
            <change-category-task
                v-if="tasksCatagoriesIds.ready !== idCategory"
                class="btn-primary ms-3"
                @click="changeCategoriesTask(nextCategoryId, idCategory, index)"
                >{{ textBtnChangeTask }}</change-category-task
            >
        </div>
    </li>
</template>

<script>
import { toRefs } from "vue";
import { useTaskList } from "@/compositions/tasks-manager/lists-tasks";
import { useListTasksItem } from "../../compositions/tasks-manager/lists-tasks/list-tasks-item";

import DeleteTask from "../DeleteTask/Main";
import ChangeCategoryTask from "../CategoriesTasks/Buttons/Change";

export default {
    components: {
        DeleteTask,
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

        removeTask: {
            type: Function,
            required: true,
            default: () => {},
        },
    },

    setup(props) {
        /** data */

        const { numberOfAllTasks, idCategory, index } = toRefs(props);

        /**
         * API список задач.
         */

        const { tasksCatagoriesIds } = useTaskList();

        /**
         * API элемент списка задач.
         */

        const { nextCategoryId, textBtnChangeTask, notLastItemCheck } =
            useListTasksItem(
                tasksCatagoriesIds,
                idCategory.value,
                numberOfAllTasks,
                index
            );

        return {
            notLastItemCheck,
            tasksCatagoriesIds,
            nextCategoryId,
            textBtnChangeTask,
        };
    },
};
</script>
