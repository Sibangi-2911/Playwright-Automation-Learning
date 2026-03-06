// @ts-check
const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 40000,
  workers: 1, // ⭐ ensures browsers run one after another

  expect: {
    timeout: 5000,
  },

  reporter: "html",

  use: {
    headless: false,
    launchOptions: {
      slowMo: 800,
    },
  },

  projects: [
    { name: "Chromium", use: { browserName: "chromium" } },
    { name: "Firefox", use: { browserName: "firefox" } },
    { name: "WebKit", use: { browserName: "webkit" } },
  ],
});
