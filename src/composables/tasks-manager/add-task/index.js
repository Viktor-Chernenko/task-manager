import { reactive, computed } from "vue";

/**
 * Инициализируем сущность "Добавления задач".
 * @param {function} addTask - метод добавления задачи.
 * @returns {object} API
 * @returns {object} API.newTask - данные для формы.
 * @returns {string} API.newTask.title - заголовок задачи.
 * @returns {string} API.newTask.description - описание задачи.
 *
 * @returns {boolean} API.isFilledRequiredFields - проверка заполнены ли обязательные поля формы.
 * @returns {function} API.addNewTask - метод добавления задачи.
 */
export function useAddTask(addTask = () => {}) {
    const newTask = reactive({
        title: "",
        description: "",
    });
    const isFilledRequiredFields = computed(() => {
        return newTask.title.length && newTask.description.length;
    });

    /**
     * Сбрасываем данные формы.
     */
    function resetForm() {
        newTask.title = "";
        newTask.description = "";
    }

    /**
     * Добавляем новую задачу.
     */
    function addNewTask() {
        addTask(newTask);
        resetForm();
    }

    return {
        newTask,
        isFilledRequiredFields,
        addNewTask,
    };
}
