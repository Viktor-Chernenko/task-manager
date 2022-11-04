import { ref, onMounted, watch, computed } from "vue";
import {
    setTasksListInLocalStorage,
    getTasksListFromLocalStorage,
} from "../../../localStorage/tasks-manager";

export function useTaskList() {
    const tasksCatagoriesIds = {
        new: "new",
        inProgress: "inProgress",
        ready: "ready",
    };
    const tasks = ref({
        new: {
            id: tasksCatagoriesIds.new,
            label: "Новые",
            items: [],
        },
        inProgress: {
            id: tasksCatagoriesIds.inProgress,
            label: "В работе",
            items: [],
        },
        ready: {
            id: tasksCatagoriesIds.ready,
            label: "Завершенные",
            items: [],
        },
    });
    const arrayTasks = computed(() => Object.values(tasks.value));
    const numberOfAllTasksInCategory = computed(() => tasks.value.length);

    /**
     * Добавляем новую задачу.
     * @param {object} newTask - данные для новой задачи.
     * @param {string} newTask.title - заголовок задачи.
     * @param {string} newTask.description - описание задачи.
     */
    function addTask({ title, description }) {
        const createData = getCreateData();
        console.log(createData);
        tasks.value.new.items.push({ title, description, createData });
    }

    /**
     * Получаем дату создания задачи.
     * @returns {string}
     */
    function getCreateData() {
        return new Date().toLocaleDateString("ru-RU", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
        });
    }

    /**
     * Удаляем задачу.
     * @param {object} data
     * @param {number} data.indexTask - индекс задачи.
     * @param {string} data.idCategory - категория задачи.
     */
    function removeTask({ indexTask, idCategory }) {
        tasks.value[idCategory].items.splice(indexTask, 1);
    }

    /**
     * Загружаем список задач из store.
     */
    function getTasksStore() {
        const tasksListFromLocalStorage = getTasksListFromLocalStorage();

        if (tasksListFromLocalStorage) {
            tasks.value = tasksListFromLocalStorage;
        }
    }

    /**
     * Изменяем категорию элемента списка.
     * @param {string} newCategoryId - категория в которую переносим задачу.
     * @param {string} oldCategoryId - категория из которую переносим задачу.
     * @param {number} indexTask - индекс задачи для переноса.
     */
    function changeCategoriesTask(newCategoryId, oldCategoryId, indexTask) {
        const [task] = tasks.value[oldCategoryId].items.splice(indexTask, 1);

        tasks.value[newCategoryId].items.unshift(task);
    }

    onMounted(() => {
        getTasksStore();
    });

    /**
     * Записываем изменения списка задач в store.
     */
    watch(
        tasks,
        (newValue) => {
            setTasksListInLocalStorage(newValue);
        },
        { deep: true }
    );

    return {
        addTask,
        removeTask,
        tasks,
        arrayTasks,
        numberOfAllTasksInCategory,
        tasksCatagoriesIds,
        changeCategoriesTask,
    };
}
