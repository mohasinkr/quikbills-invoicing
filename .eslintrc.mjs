import pluginCypress from "eslint-plugin-cypress/flat";

export default [
  {
    extends: [
      "next/core-web-vitals",
      "next/typescript",
      "prettier",
      "pluginCypress",
    ],
  },
];
