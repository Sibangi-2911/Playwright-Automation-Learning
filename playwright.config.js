// playwright.config.js
/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: "./tests",
  timeout: 40 * 1000,
  expect: {
    timeout: 5000,
  },
  use: {
    browserName: "chromium",
    headless: false,
    screenshot: "on",
    trace: "retain-on-failure",
  },
  reporter: [["line"], ["allure-playwright"]],
};

module.exports = config;
