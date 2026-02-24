// @ts-check
const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 40000,

  expect: {
    timeout: 5000,
  },

  reporter: "html",

  use: {
    browserName: "chromium",
    headless: false, // ⭐ browser visible
    slowMo: 1000, // ⭐ slow execution
  },
});
