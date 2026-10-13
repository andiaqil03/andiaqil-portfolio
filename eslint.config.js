import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['build', '.react-router', '.impeccable', 'node_modules']),
  js.configs.recommended,
  tseslint.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  reactHooks.configs.flat.recommended,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
]);
