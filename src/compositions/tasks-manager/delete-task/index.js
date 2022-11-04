/**
 * Инициализируем сущность "Удаление задач".
 * @param {object} emit
 * @returns {object} API
 * @returns {function} API.removeTask - метод генерирующий событие "Удаление задачи".
 */
export function useRemoveTask(emit) {
    /**
     * Генерируем событие "Удаление задачи".
     * @param {object} data
     * @param {number} data.indexTask - индекс задачи.
     * @param {string} data.idCategory - категория задачи.
     */
    function removeTaskEmit({ indexTask, idCategory }) {
        emit("removeTask", { indexTask, idCategory });
    }

    return {
        removeTaskEmit,
    };
}
