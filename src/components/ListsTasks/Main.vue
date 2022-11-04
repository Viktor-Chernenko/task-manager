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
                :class="{ active: isCurrentTabIndex(index) }"
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
            :class="{ 'active show': isCurrentTabIndex(index) }"
            role="tabpanel"
        >
            <list-tasks
                :tasks="listTasks.items"
                :id-category="listTasks.id"
                :change-categories-task="changeCategoriesTask"
                @removeTask="removeTaskEmit"
            />
        </div>
    </div>
</template>

<script>
import { useTabs } from "@/compositions/components/tabs";
import { useRemoveTask } from "../../compositions/tasks-manager/delete-task";
import { isNumber, isString } from "../../utils/data-type-check";

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
        removeTask({ indexTask, idCategory }) {
            const isCorrectIndex = isNumber(indexTask);
            const isCorrectIdCategory =
                isString(idCategory) && idCategory.length;

            return isCorrectIndex && isCorrectIdCategory;
        },
    },

    setup(_, { emit }) {
        /**
         * API Удаление задач.
         */

        const { removeTaskEmit } = useRemoveTask(emit);

        /**
         * API Tabs.
         */

        const { toggleCurrentTab, isCurrentTabIndex } = useTabs();

        return {
            removeTaskEmit,
            toggleCurrentTab,
            isCurrentTabIndex,
        };
    },
};
</script>
