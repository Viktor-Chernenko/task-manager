/**
 * Записываем список задач в localStorage
 * @param {[Object]} tasksList - список задач.
 */
export function setTasksListInLocalStorage(tasksList) {
    localStorage.setItem("tasksLists", JSON.stringify(tasksList));
}

/**
 * Получаем список задач из localStorage
 * @return {[Object]} tasksList - список задач.
 */
export function getTasksListFromLocalStorage() {
    const tasksList = JSON.parse(localStorage.getItem("tasksLists"));

    return tasksList;
}
