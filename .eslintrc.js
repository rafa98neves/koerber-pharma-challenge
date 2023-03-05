module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/strongly-recommended",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "prettier",
  ],
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { "ignoreRestSiblings": true }],
    'spaced-comment': [
      'warn',
      'always'
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
