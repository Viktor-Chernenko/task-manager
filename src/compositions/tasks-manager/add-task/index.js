import { reactive, computed } from "vue";

/**
 * Инициализируем сущность "Добавления задач".
 * @param {object} emit
 * @returns {object} API
 * @returns {object} API.newTask - данные для формы.
 * @returns {string} API.newTask.title - заголовок задачи.
 * @returns {string} API.newTask.description - описание задачи.
 *
 * @returns {boolean} API.isFilledRequiredFields - проверка заполнены ли обязательные поля формы.
 * @returns {function} API.addTask - метод добавления формы.
 */
export function useAddTask(emit) {
    /** vars */

    const newTask = reactive({
        title: "",
        description: "",
    });

    /** computed */

    const isFilledRequiredFields = computed(() => {
        return newTask.title.length && newTask.description.length;
    });

    /** methods */

    /**
     * Сбрасываем данные формы. искренний
     */
    function resetForm() {
        newTask.title = "";
        newTask.description = "";
    }
    /**
     * Добавляем новую задачу.
     */
    function addTask() {
        emit("addTask", newTask);
        resetForm();
    }

    return {
        newTask,
        isFilledRequiredFields,
        addTask,
    };
}
