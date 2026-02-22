// @ts-check
import { defineConfig, devices } from "@playwright/test";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: "./tests",
  timeout: 400000,
  expect: {
    timeout: 5000,
  },
  reporter: "html",
  use: {
    browserName: "webkit",
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    headless: false,
  },
};

module.exports = config;
