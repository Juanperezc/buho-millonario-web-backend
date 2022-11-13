module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', 'commitlint.config.js'],
  settings: {
    'import/resolver': {
      'typescript': true,
      'node': true,
    },
  },
  rules: {
    'no-console': 'warn',
    'no-else-return': ['error', { allowElseIf: false }],
    'no-return-await': 'error',
    'no-unused-vars': ['error', {
      vars: 'all',
      args: 'after-used',
      ignoreRestSiblings: true
    }],
    'sort-imports': ['error', {
      ignoreDeclarationSort: true
    }],

    'import/order': ['error', {
      'newlines-between': 'never',
      alphabetize: {
        order: 'asc'
      },
      groups: ['external', 'builtin', 'internal', 'index', 'parent', 'sibling', 'object', 'type']
    }],
    'import/no-duplicates': 'error',
    'import/no-useless-path-segments': ['error', {
      noUselessIndex: true,
      commonjs: true
    }],
    'import/newline-after-import': 'error',

    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: false
        }
      }
    ],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': ['error', {
      ignoreRestArgs: true
    }],
    '@typescript-eslint/ban-types': ['error', {
      types: {
        'object': {
          message: 'Use Record<string, any> instead',
          fixWith: 'Record<string, any>',
        },
        'Object': {
          message: 'Use Record<string, any> instead',
          fixWith: 'Record<string, any>',
        },
        '[]': 'Use [<type>], <type>[] or Array<type> instead',
      },
      extendDefaults: true
    }],
  },
};
