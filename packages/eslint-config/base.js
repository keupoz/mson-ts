import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  react: true,
  isInEditor: false,
  rules: {
    'antfu/curly': ['off'],
    'curly': ['error', 'all'],

    'style/brace-style': ['error', '1tbs'],

    'perfectionist/sort-imports': ['error', {
      internalPattern: ['@repo/**', '@demo/**', '@ui/**'],
      groups: [
        'type',
        ['parent-type', 'sibling-type', 'index-type'],

        'builtin',
        'external',
        ['internal', 'internal-type'],
        ['parent', 'sibling', 'index'],
        'side-effect',
        'object',
        'unknown',
      ],
      newlinesBetween: 'ignore',
      order: 'asc',
      type: 'natural',
    }],
  },
})
