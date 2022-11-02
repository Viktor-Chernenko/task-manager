import { toRefs } from "vue";

export function useListTasks(props) {
    /** vars */

    const { tasks } = toRefs(props);

    /**methods */

    /**
     * Проверяем не является ли задача последней в списке задач.
     * @param {number} indexTask - индекс задачи.
     * @returns {boolean}
     */
    function notLastItemCheck(indexTask) {
        return tasks.value.length !== indexTask + 1;
    }

    return {
        notLastItemCheck,
    };
}
