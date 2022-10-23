module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: ["eslint:recommended", "plugin:vue/essential"],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
    },
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
    },
    plugins: ["vue"],
    // eslint-disable-next-line max-len

    rules: {
        "vue/require-prop-types": "error", // ! Обязательная валидация props
        "vue/no-multiple-template-root": "off", // Отключаем ограничение использование одного корневого тега в шаблоне Vue (это стало возможным во Vue3)
        "vue/attribute-hyphenation": ["error", "always"], //! Props пишем в стиле 'prop-name'
        "vue/html-end-tags": "error", // ! За незакрытые html-тэги
        "vue/component-name-in-template-casing": ["error", "kebab-case"], // ! Компоненты пишем в стиле kebab-case
        "vue/attributes-order": "warn", // ~ За несоблюдение порядка директив
        "vue/singleline-html-element-content-newline": "off", // Отключаем обязательные переносы на новую строку
        "vue/order-in-components": "off", // Разрешаем использовать methods выше, чем хуки
        "vue/no-v-html": "off", // Разрешаем использование v-html
        "space-before-function-paren": "off", // Разрешаем не писать пробел между названием функции и скобкой
        "no-empty-pattern": "off", // Разрешаем использовать пустые объекты, массивы и т.д.
        indent: ["error", 4, { SwitchCase: 1 }], // ! Отступы 4 пробела... За любые другие ошибка.
        semi: "warn", // Не требует точки с запятой в конце каждого оператора.
        "array-bracket-spacing": "off", // Разрешает пробелы между скобками массивов , деструктуризации
        "block-spacing": [2, "always"], // Это правило обеспечивает постоянный интервал внутри токена открытого блока и следующего токена в той же строке. Это правило также обеспечивает постоянный интервал внутри токена закрытого блока и предыдущего токена в одной строке.
        "arrow-parens": "off", // Стрелочные функции могут опускать круглые скобки, если они имеют ровно один параметр.
        "max-len": [
            "error",
            {
                code: Infinity,
                ignoreComments: true,
                ignoreUrls: true,
                ignoreTemplateLiterals: true,
                ignoreStrings: true,
            },
        ], // Максимальная длина строки
        "constructor-super": "warn", // Требовать вызова `super ()` в конструкторах
        "no-cond-assign": "error", // Запретить операторы присваивания в условных выражениях
        "no-const-assign": "error", // Запретить переназначение переменных `const`
        "no-dupe-args": "error", // Запретить повторяющиеся аргументы в определениях функций
        "no-dupe-else-if": "error", // Запретить повторяющиеся условия в цепочках if-else-if
        "no-dupe-keys": "error", // Запретить дублирование ключей
        "no-func-assign": "error", // Запретить переназначение объявленной функции
        "no-template-curly-in-string": "error", // Запретить синтаксис шаблонного литерала-заполнителя в обычных строках
        "no-this-before-super": "error", // Запретить `this` перед вызовом `super ()` в конструкторах
        "no-unmodified-loop-condition": "error", // Запретить неизменяемые условия цикла
        "default-case": "error", // Требовать `default` при использование `switch case`
        eqeqeq: "error", // Требуют использования только строго сравнения `===` и `! ==`
        "no-var": "error", // Требовать let или const вместо var
        "require-await": "error", // Запретить асинхронные функции, у которых нет выражения `await`
        "no-undef": "warn", // Запретить необъявленные переменные
        "vue/no-v-for-template-key": "off", // Разрешить использовать :key в <template></template>
    },
};
