const { test, expect } = require("@playwright/test");

test.only("Login Test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const products = page.locator(".card-body");
  const productName = "ZARA COAT 3";
  const cardTitle = page.locator(".card-body b");
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  console.log(await page.title());
  await expect(page).toHaveTitle("Let's Shop");

  await page.locator("#userEmail").fill("sibangiboxipatro@gmail.com");
  await page.locator("#userPassword").fill("Sibangi@123");
  await page.locator("#login").click();

  //wait mechanism in service based applications
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();
  const allTitles = await cardTitle.allTextContents();
  console.log(allTitles);

  //end to end automation testing
  const count = await products.count();
  for (let i = 0; i < count; i++) {
    if ((await products.nth(i).locator("b").textContent()) == productName) {
      //logic to add to cart
      await products.nth(i).locator("text =  Add To Cart").click();
      break;
    }
  }
  await page.locator("[routerlink*='cart']").click();
  await page.locator("div li").first().waitFor(); //becoz isVisible doesn't support auto wait
  const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible(); // has-text is pseudo class
  expect(bool).toBeTruthy();
});

test("Page Playwright test", async ({ page }) => {
  await page.goto("https://google.com");
  //get title - assertion
  console.log(await page.title());
  await expect(page).toHaveTitle("Google");
});
