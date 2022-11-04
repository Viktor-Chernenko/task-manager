export function useListTasksItem(
    numberOfAllTasks,
    tasksCatagoriesIds,
    idCategoryCurrent
) {
    const nextCategoryId = getNextCategoryId();
    const textsBtnChange = {
        [tasksCatagoriesIds.new]: "Взять в работу",
        [tasksCatagoriesIds.isProgress]: "Завершить задачу",
        default: "Изменить категорию",
    };
    const textBtnChangeTask = getTextBtnChangeTask();

    /**
     * Проверяем не является ли задача последней в списке задач.
     * @param {number} indexTask - индекс задачи.
     * @returns {boolean}
     */
    function notLastItemCheck(indexTask) {
        return numberOfAllTasks !== indexTask + 1;
    }

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
     * Получаем текст для кнопки изменения.
     * @returns {string}
     */
    function getTextBtnChangeTask() {
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
        notLastItemCheck,
        nextCategoryId,
        textBtnChangeTask,
    };
}
