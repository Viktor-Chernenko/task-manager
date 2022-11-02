/**
 * Проверяем является ли сущность строкой.
 * @param {*} checkableItem - проверяемая сущность.
 * @returns {boolean} результат проверки.
 */
export function isString(checkableItem) {
    const stringDataType = "string";
    const isString = typeof checkableItem === stringDataType;

    return isString;
}

/**
 * Проверяем является ли сущность числом.
 * @param {*} checkableItem - проверяемая сущность.
 * @returns {boolean} результат проверки.
 */
export function isNumber(checkableItem) {
    const numberDataType = "number";
    const isNumber = typeof checkableItem === numberDataType;

    return isNumber;
}
