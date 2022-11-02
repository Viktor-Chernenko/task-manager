import { ref, onMounted, watch } from "vue";
import {
    setTasksListInLocalStorage,
    getTasksListFromLocalStorage,
} from "../../../localStorage/tasks-manager";

export function useTaskListChanges() {
    /**
     * vars
     */

    const tasks = ref([]);

    /**
     * methods
     */

    /**
     * Добавляем новую задачу.
     * @param {object} newTask - данные для новой задачи.
     * @param {string} newTask.title - заголовок задачи.
     * @param {string} newTask.description - описание задачи.
     */
    function addTask({ title, description }) {
        tasks.value.push({ title, description });
    }

    /**
     * Удаляем задачу.
     * @param {number} indexTask - индекс задачи.
     */
    function removeTask(indexTask) {
        tasks.value.splice(indexTask, 1);
    }

    /**
     * watch
     */

    watch(
        tasks,
        (newValue) => {
            setTasksListInLocalStorage(newValue);
        },
        { deep: true }
    );

    /**
     * onMounted
     */

    onMounted(() => {
        const tasksListFromLocalStorage = getTasksListFromLocalStorage();

        if (tasksListFromLocalStorage) {
            tasks.value.push(...tasksListFromLocalStorage);
        }
    });

    return {
        addTask,
        removeTask,
        tasks,
    };
}
