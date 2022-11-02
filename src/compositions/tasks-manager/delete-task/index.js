/**
 * Инициализируем сущность "Удаление задач".
 * @param {object} emit
 * @returns {object} API
 * @returns {function} API.removeTask - метод генерирующий событие "Удаление задачи".
 */
export function useRemoveTask(emit) {
    /** methods */

    /**
     * Генерируем событие "Удаление задачи".
     * @param {number} indexTask - индекс задачи.
     */
    function removeTask(indexTask) {
        emit("removeTask", indexTask);
    }

    return {
        removeTask,
    };
}
