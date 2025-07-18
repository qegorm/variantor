import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config([
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactHooks.configs['recommended-latest'],
  reactRefresh.configs.vite,
  {
    ignores: ['dist'],
    files: ['**/*.{ts,tsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])
