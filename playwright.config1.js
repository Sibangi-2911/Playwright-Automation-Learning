// @ts-check
import { defineConfig, devices } from "@playwright/test";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: "./tests",
  retries: 1, //No. of retries to be done if test fails
  workers: 3, //for parallel execution among the test files--- by default it is 3
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
        ...devices["iPhone 11"],
      },
    },
    {
      name: "chrome",
      use: {
        browserName: "chromium",
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        headless: false,
        screenshot: "on",
        ignoreHttpsErrors: true, //if not ssl certified
        permissions: ["geolocation"], //for allowing location popup
        video: "retain-on-failure",
        trace: "retain-on-failure", //generate trace only on failure for debugging
        viewport: { width: 720, height: 720 }, //sets the bowser window size--->web responsive testing
      },
    },
  ],
};

module.exports = config;
