import js from 
import globals from 
import reactHooks from 
import reactRefresh from 
import { defineConfig, globalIgnores } from 

export default defineConfig([
  globalIgnores([]),
  {
    files: [],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: ,
        ecmaFeatures: { jsx: true },
        sourceType: ,
      },
    },
    rules: {
      : [, { varsIgnorePattern:  }],
    },
  },
])
