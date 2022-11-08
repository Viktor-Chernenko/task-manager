import { ref, computed } from "vue";

/**
 * Инициализируем сущность "Изменение задач".
 * @param {function} emit.
 * @returns {object} API
 * @returns {boolean} API.isFilledRequiredFields - проверка заполнены ли обязательные поля формы.
 * @returns {function} API.emitEditedTask - метод генерирует событие "Изменение задачи".
 * @returns {function} API.showEditForm - метод отображения формы изменения задачи.
 * @returns {boolean} API.isShowEditForm - флаг отображения формы изменения задачи.
 * @returns {object} API.editableTask - данные изменяемой задачи.
 */
export function useEditTask(emit = () => {}) {
    let editableTask = ref({
        title: "",
        description: "",
    });
    let isShowEditForm = ref(false);

    const isFilledRequiredFields = computed(() => {
        return (
            editableTask.value.title?.length &&
            editableTask.value.description?.length
        );
    });

    /**
     * Показываем форму редактирования задачи.
     * @param {object} task - данные задачи.
     * @param {object} task.title - заголовок.
     * @param {object} task.description - описание.
     */
    function showEditForm({ title = "", description = "" } = {}) {
        editableTask.value.title = title;
        editableTask.value.description = description;

        toggleVisibilityEditForm();
    }

    /**
     * Генерируем событие "Изменение формы".
     * @param {object} dataTaskEdit - данные для изменения задачи.
     * @param {number} dataTaskEdit.indexTask - индекс задачи.
     * @param {string} dataTaskEdit.idCategory - идентификатор категории задачи.
     * @param {object} dataTaskEdit.editableTask - данные для изменения задачи.
     */
    function emitEditedTask({
        indexTask = 0,
        idCategory = "",
        editableTask = {},
    }) {
        emit("editedTask", { indexTask, idCategory, editableTask });
        toggleVisibilityEditForm();
    }

    /**
     * Переключаем видимость формы редактирования задачи.
     */
    function toggleVisibilityEditForm() {
        isShowEditForm.value = !isShowEditForm.value;
    }

    return {
        isFilledRequiredFields,
        emitEditedTask,
        isShowEditForm,
        showEditForm,
        editableTask,
    };
}
