module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['eslint:recommended',
  "plugin:@typescript-eslint/eslint-recommended",
  "plugin:@typescript-eslint/recommended",
  "prettier/@typescript-eslint",
  'plugin:vue/vue3-recommended'],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { "ignoreRestSiblings": true }],
    'spaced-comment': [
      'warn',
      'always'
    ],
    'vue/valid-v-slot': [
      'error',
      {
        allowModifiers: true,
      },
    ],
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      { registeredComponentsOnly: false },
    ],
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
};
