const { test, expect } = require("@playwright/test");

test("Popup validations", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  //Working of Navigation
  await page.goto("http://google.com");
  await page.goBack(); //go to rahulshetty
  await page.goForward(); //go to google again
  await page.goBack();

  // Validate if element is hidden, displayed mode with Expect assertions
  await expect(page.locator("#displayed-text")).toBeVisible();
  await page.locator("#hide-textbox").click();
  await expect(page.locator("#displayed-text")).toBeHidden();
});
