import { computed } from "vue";

/**
 * Инициализируем сущность "Элемент списка задач".
 * @param {object} tasksCatagoriesIds - все идентификаторы категорий.
 * @param {string} idCategoryCurrent - идентификатор выбранной категории.
 * @param {string} numberOfAllTasks - количество всего задач в категории.
 * @param {number} indexListItem - индекс задачи.
 *
 * @returns API
 * @returns {string} API.nextCategoryId - идентификатор следующей категории.
 * @returns {string} API.textBtnChangeCatagoriesTask - текст для кнопки изменения задачи категории.
 * @returns {boolean} API.notLastItemCheck - проверка является ли задача последней в списке задач.
 *
 */
export function useListTasksItem(
    tasksCatagoriesIds,
    idCategoryCurrent,
    numberOfAllTasks,
    indexListItem
) {
    const nextCategoryId = getNextCategoryId();
    const textsBtnChange = {
        [tasksCatagoriesIds.new]: "Взять в работу",
        [tasksCatagoriesIds.isProgress]: "Завершить задачу",
        default: "Изменить категорию",
    };
    const textBtnChangeCatagoriesTask = getTextBtnChangeCatagoriesTask();
    const notLastItemCheck = computed(
        () => numberOfAllTasks.value !== indexListItem.value + 1
    );

    /**
     * Получаем идентификатор следующей категории.
     * @returns {string}
     */
    function getNextCategoryId() {
        let passedCurrentCategory = false;
        const nextCategoryId = Object.values(tasksCatagoriesIds).reduce(
            (acc, categoryId) => {
                if (passedCurrentCategory && !acc) {
                    acc = categoryId;
                }

                if (categoryId === idCategoryCurrent) {
                    passedCurrentCategory = true;
                }

                return acc;
            },
            ""
        );

        return nextCategoryId;
    }

    /**
     * Получаем текст для кнопки изменения категории задачи.
     * @returns {string}
     */
    function getTextBtnChangeCatagoriesTask() {
        switch (idCategoryCurrent) {
            case tasksCatagoriesIds.new:
                return textsBtnChange[tasksCatagoriesIds.new];
            case tasksCatagoriesIds.isProgress:
                return textsBtnChange[tasksCatagoriesIds.isProgress];
            default:
                return textsBtnChange[tasksCatagoriesIds.default];
        }
    }

    return {
        nextCategoryId,
        textBtnChangeCatagoriesTask,
        notLastItemCheck,
    };
}
