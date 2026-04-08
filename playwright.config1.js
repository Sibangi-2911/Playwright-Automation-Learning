// @ts-check
import { defineConfig, devices } from "@playwright/test";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: "./tests",
  timeout: 40 * 1000,
  launchOptions: {
    slowMo: 800,
  },
  expect: {
    timeout: 5000,
  },
  reporter: "html",
  projects: [
    {
      name: "Safari Execution",
      use: {
        browserName: "webkit",
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        headless: false,
        screenshot: "on",
        trace: "retain-on-failure", //generate trace only on failure for debugging
      },
    },
  ],
};

module.exports = config;
