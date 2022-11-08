/**
 * Инициализируем сущность "Удаляем задач".
 * @param {function} emit.
 * @returns {object} API
 * @returns {function} API.emitDeleteTask - метод генерирует событие "Удаление задачи".
 */
export function useDeleteTask(emit = () => {}) {
    /**
     * Генерируем событие "Удаление задачи".
     * @param {object} dataTaskEdit - данные для удаления задачи.
     * @param {number} dataTaskEdit.indexTask - индекс задачи.
     * @param {string} dataTaskEdit.idCategory - идентификатор категории задачи.
     */
    function emitDeleteTask({ indexTask = 0, idCategory = "" }) {
        emit("deleteTask", { indexTask, idCategory });
    }

    return {
        emitDeleteTask,
    };
}
