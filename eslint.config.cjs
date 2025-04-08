const { FlatCompat } = require('@eslint/eslintrc');
const { fixupConfigRules } = require('@eslint/compat');
const globals = require('globals');
const compat = new FlatCompat({ baseDirectory: __dirname });

module.exports = fixupConfigRules([
  { ignores: ['**/*.d.ts', 'senseApi.ts', 'tailwind.config.js'] },

  ...compat.extends(
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'next',
    'next/core-web-vitals'
  ),

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.es2021 },
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      'unused-imports': require('eslint-plugin-unused-imports'),
      prettier: require('eslint-plugin-prettier'),
    },
    rules: {
      'react/display-name': 'off',
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-unused-expressions': [
        'error',
        { allowShortCircuit: true },
      ],
    },
  },
]);
