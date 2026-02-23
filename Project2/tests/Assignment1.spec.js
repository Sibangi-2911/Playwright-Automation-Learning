const { test, expect } = require("@playwright/test");

test.only("Login Test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const cardTitle = page.locator(".card-body b");
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  console.log(await page.title());
  await expect(page).toHaveTitle("Let's Shop");

  await page.locator("#userEmail").fill("sibangiboxipatro@gmail.com");
  await page.locator("#userPassword").fill("Sibangi@123");
  await page.locator("#login").click();

  //wait mechanism in service based applications
  await page.waitForLoadState("networkidle");
  const allTitles = await cardTitle.allTextContents();
  console.log(allTitles);
});
