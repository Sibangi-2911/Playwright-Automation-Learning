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

  //Handle alert popups
  //await page.pause();
  page.on("dialog", (dialog) => dialog.accept()); // on listens to event and can use dismiss for slecting cancel in popup
  await page.locator("#confirmbtn").click();

  //handle hover options
  await page.locator("#mousehover").hover();

  //Handle & Automate frames
  const framesPage = page.frameLocator("#courses-iframe");
  await framesPage.locator('a[href*="lifetime-access"]:visible').click();
  const textCheck = await framesPage.locator(".text h2").textContent();
  console.log(textCheck.split(" ")[1]);
});

//Screenshot
test("Screenshot & Visual comparison", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await page.waitForLoadState();

  // Validate if element is hidden, displayed mode with Expect assertions
  await expect(page.locator("#displayed-text")).toBeVisible();
  await page
    .locator("#displayed-text")
    .screenshot({ path: "partialscreenshot.png" }); // Screenshot of a particular element
  await page.locator("#hide-textbox").click();
  await page.screenshot({ path: "screenshot.png" }); //Complete page screenshot
  await expect(page.locator("#displayed-text")).toBeHidden();
});

//Visual Testing---- Take actual screenshot today--> then store---> then again while testing screenshot taken to compare it with previous one
test("Visual Testing", async ({ page }) => {
  await page.goto("https://www.flightaware.com/");

  await page.waitForLoadState("networkidle");

  // Example: capture only header (stable area)
  const header = page.locator("header");

  await expect(header).toHaveScreenshot("header.png");
});

test.only("Visual", async ({ page }) => {
  await page.goto("http://google.com");
  expect(await page.screenshot()).toMatchSnapshot("landingPage.png");
});
