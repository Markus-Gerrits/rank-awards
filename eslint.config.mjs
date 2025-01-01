import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginJest from "eslint-plugin-jest";

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.nodeBuiltin,
      },
    },
  },
  { settings: { react: { version: "detect" } } },
  { ignores: [".next/", "node_modules"] },
  {
    files: ["**/*.spec.js", "**/*.test.js"],
    ...pluginJest.configs["flat/recommended"],
    plugins: { jest: pluginJest },
    languageOptions: {
      globals: pluginJest.environments.globals.globals,
    },
    rules: {
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/prefer-to-have-length": "warn",
      "jest/valid-expect": "error",
    },
  },
];
