import antfu from '@antfu/eslint-config';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat();

export default antfu({
  stylistic: {
    semi: true,
  },
  formatters: true,
  react: true,
  rules: {
    'curly': ['error', 'all'],
    'style/brace-style': ['error', '1tbs'],
    'import/order': ['off'],
    'perfectionist/sort-imports': [
      'error',
      {
        'type': 'natural',
        'internal-pattern': ['@/**'],
        'groups': [
          'type',
          ['builtin', 'external'],
          'internal-type',
          'internal',
          ['parent-type', 'sibling-type', 'index-type'],
          ['parent', 'sibling', 'index'],
          'object',
          'style',
          'unknown',
        ],
      },
    ],
    'perfectionist/sort-union-types': [
      'error',
      {
        'type': 'natural',
        'nullable-last': true,
      },
    ],
  },
  isInEditor: false,
}, {
  ignores: ['src/shadcn/**', '**/assets/**'],
}, ...compat.config({
  // https://github.com/francoismassart/eslint-plugin-tailwindcss
  extends: ['plugin:tailwindcss/recommended'],
  rules: {
    'tailwindcss/no-custom-classname': 'off',
  },
}));
