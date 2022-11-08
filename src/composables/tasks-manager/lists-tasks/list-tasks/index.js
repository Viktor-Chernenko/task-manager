import { computed } from "vue";

/**
 * Инициализируем сущность "список задач".
 * @param {object} tasksList - список задач.
 * @returns {number} numberOfAllTasks - количество задач в списке.
 */
export function useListTasks(tasksList) {
    const numberOfAllTasks = computed(() => tasksList.value.length);

    return { numberOfAllTasks };
}
