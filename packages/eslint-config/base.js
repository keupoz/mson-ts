import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  react: true,
  isInEditor: false,
  rules: {
    'antfu/curly': ['off'],
    'antfu/if-newline': ['off'],

    'curly': ['error', 'multi-line', 'consistent'],
    'style/brace-style': ['error', '1tbs'],

    'perfectionist/sort-imports': ['error', {
      internalPattern: ['^@repo/.*', '^@demo/.*', '^@ui/.*'],
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
