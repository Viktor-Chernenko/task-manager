<template>
    <ul class="nav nav-tabs mb-4" role="tablist">
        <li
            v-for="(listTasks, index) in listsTasks"
            :key="index"
            class="nav-item"
            role="presentation"
        >
            <button
                class="nav-link text-white"
                :class="{ active: defineCurrentTabIndex(index) }"
                data-bs-toggle="tab"
                :data-bs-target="`#${listTasks.id}`"
                type="button"
                role="tab"
                aria-selected="true"
                @click="toggleCurrentTab(index)"
            >
                {{ listTasks.label }}
            </button>
        </li>
    </ul>

    <div class="tab-content">
        <div
            v-for="(listTasks, index) in listsTasks"
            :id="listTasks.id"
            :key="index"
            class="tab-pane fade"
            :class="{ 'active show': defineCurrentTabIndex(index) }"
            role="tabpanel"
        >
            <list-tasks
                :tasks="listTasks.items"
                :id-category="listTasks.id"
                :change-categories-task="changeCategoriesTask"
                @deleteTask="emitDeleteTask"
                @editedTask="emitEditedTask"
            />
        </div>
    </div>
</template>

<script>
import { useTabs } from "@/composables/common/tabs";
import { useEditTask } from "@/composables/tasks-manager/edit-task";
import { useDeleteTask } from "@/composables/tasks-manager/delete-task";
import { isNumber } from "@/utils/data-type-check";

import ListTasks from "./List";

export default {
    components: {
        ListTasks,
    },

    props: {
        listsTasks: {
            type: Array,
            required: true,
            default: () => [],
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

    setup(_, { emit }) {
        /**
         * API Tabs.
         */

        const { toggleCurrentTab, defineCurrentTabIndex } = useTabs();

        /**
         * API изменения задачи.
         */

        const { emitEditedTask } = useEditTask(emit);

        /**
         * API удаление задачи.
         */

        const { emitDeleteTask } = useDeleteTask(emit);

        return {
            toggleCurrentTab,
            defineCurrentTabIndex,
            emitEditedTask,
            emitDeleteTask,
        };
    },
};
</script>
