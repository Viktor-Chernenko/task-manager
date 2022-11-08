import { ref, onMounted, watch, computed } from "vue";
import {
    setTasksListInLocalStorage,
    getTasksListFromLocalStorage,
} from "@/localStorage/tasks-manager";

/**
 * Инициализируем сущность "Списки задач".
 * @returns API
 * @returns {function} API.addTask - метод добавления новой задачи.
 * @returns {function} API.deleteTask - метод удаления задачи.
 * @returns {function} API.updateTask - метод изменения задачи.
 * @returns {object} API.tasks - список всех категорий с задачами.
 * @returns {array} API.arrayTasks - массив списка всех категорий с задачами.
 * @returns {object} API.tasksCatagoriesIds - все идентификаторы категорий.
 * @returns {function} API.changeCategoriesTask - метод изменения категории задачи.
 */
export function useTasksLists() {
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

    /**
     * Добавляем новую задачу.
     * @param {object} newTask - данные для новой задачи.
     * @param {string} newTask.title - заголовок задачи.
     * @param {string} newTask.description - описание задачи.
     */
    function addTask({ title = "", description = "" }) {
        const createData = getCreateData();
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
    function deleteTask({ indexTask = 0, idCategory = "" }) {
        tasks.value[idCategory].items.splice(indexTask, 1);
    }

    /**
     * Изменяем задачу.
     * @param {object} dataTaskEdit
     * @param {number} dataTaskEdit.indexTask - индекс задачи.
     * @param {string} dataTaskEdit.idCategory - категория задачи.
     * @param {object} dataTaskEdit.editableTask - данные для изменения задачи.
     */
    function updateTask({ indexTask = 0, idCategory = "", editableTask = "" }) {
        const updatedTask = tasks.value[idCategory].items[indexTask];
        tasks.value[idCategory].items[indexTask] = Object.assign(
            updatedTask,
            editableTask
        );
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
    function changeCategoriesTask(
        newCategoryId = "",
        oldCategoryId = "",
        indexTask = 0
    ) {
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
        deleteTask,
        updateTask,
        tasks,
        arrayTasks,
        tasksCatagoriesIds,
        changeCategoriesTask,
    };
}
