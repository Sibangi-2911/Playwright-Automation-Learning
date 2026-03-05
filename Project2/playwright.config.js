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
    launchOptions: {
      slowMo: 800, // ✅ 0.8 second delay per action
    },
  },
});
