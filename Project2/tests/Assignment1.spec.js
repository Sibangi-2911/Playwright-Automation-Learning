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
  await page.locator("text = Checkout").click();

  //credit card field
  await page
    .locator(".field:has-text('Credit Card Number') input")
    .fill("4542993192922293");

  //cvv code
  await page.locator(".field:has-text('CVV Code') input").fill("204");

  //Name on card
  await page
    .locator(".field:has-text('Name on Card') input")
    .fill("SIBANGI BOXIPATRO");

  //Apply Coupon
  await page.locator("[name*='coupon']").fill("rahulshettyacademy");
  await page.locator("[type = 'submit']").click();

  //Expiry date dropdown
  const expiryDropdowns = page.locator(".field:has-text('Expiry Date') select");
  await expiryDropdowns.first().selectOption("03");
  await expiryDropdowns.nth(1).selectOption("27");

  //Shipping Information suggestive dropdown
  const country = page.getByPlaceholder("Select Country");
  await country.click();
  await country.pressSequentially("ind", { delay: 150 });
  const dropdown = page.locator(".ta-results .ta-item");
  await expect(dropdown.first()).toBeVisible();
  const optionsCount = await dropdown.count();
  for (let i = 0; i < optionsCount; i++) {
    const text = await dropdown.nth(i).textContent();
    if (text.trim() === "India") {
      await dropdown.nth(i).click();
      break;
    }
  }

  await page.pause();
});

test("Page Playwright test", async ({ page }) => {
  await page.goto("https://google.com");
  //get title - assertion
  console.log(await page.title());
  await expect(page).toHaveTitle("Google");
});
