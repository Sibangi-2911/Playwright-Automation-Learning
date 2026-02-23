const { test, expect } = require("@playwright/test");

test.only("Browser Context Playwright test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const userName = page.locator("#username");
  const signIn = page.locator("#signInBtn");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(page.title());

  //css selector for identifying edit box
  await userName.fill("rahulshetty");
  await page.locator("[type = 'password']").fill("Learning@830$3mK2");
  await signIn.click();
  console.log(await page.locator("[style *= 'block']").textContent());
  await expect(page.locator("[style *= 'block']")).toContainText("Incorrect");

  //enter valid credentials and erase existing ones
  await userName.fill("");
  await userName.fill("rahulshettyacademy");
  await signIn.click();
  console.log(await page.locator(".card-body a").first().textContent());
  console.log(await page.locator(".card-body a").nth(1).textContent());
  console.log(await page.locator(".card-body a").last().textContent());
});

test("Page Playwright test", async ({ page }) => {
  await page.goto("https://google.com");
  //get title - assertion
  console.log(await page.title());
  await expect(page).toHaveTitle("Google");
});
