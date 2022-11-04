import { ref } from "vue";

/**
 * Инициализируем сущность "Tabs".
 * @param {number} indexCurrentTab - выбранный таб при создание компонента.
 * @returns {object} API
 * @returns {number} API.currentTab - активный таб.
 * @returns {function} API.toggleCurrentTab - метод изменение активного таба.
 * @returns {function} API.toggleCurrentTab - метод определяет активный таб.
 */
export function useTabs(indexCurrentTab = 0) {
    const currentTab = ref(indexCurrentTab);

    /**
     * Изменяем активный таб.
     * @param {number} index - индекс выбранного таба.
     */
    function toggleCurrentTab(index) {
        currentTab.value = index;
    }

    /**
     * Определяем активный таб.
     * @param {number} index - индекс проверяемого элемента.
     * @returns {boolean}
     */
    function isCurrentTabIndex(index) {
        return currentTab.value === index;
    }

    return { currentTab, toggleCurrentTab, isCurrentTabIndex };
}
