import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
    rules: {
      semi: "error",
      "no-console": "error",
      "no-unused-vars": "error",
      "no-var": "error",
      "no-undef": "error",
    },
  },
]);
