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
    const newTask = reactive({
        title: "",
        description: "",
    });
    const isFilledRequiredFields = computed(() => {
        return newTask.title.length && newTask.description.length;
    });

    /**
     * Добавляем новую задачу.
     */
    function addTaskEmit() {
        emit("addTask", newTask);
        resetForm();
    }

    /**
     * Сбрасываем данные формы.
     */
    function resetForm() {
        newTask.title = "";
        newTask.description = "";
    }

    return {
        newTask,
        isFilledRequiredFields,
        addTaskEmit,
    };
}
