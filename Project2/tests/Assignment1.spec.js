const { test, expect } = require("@playwright/test");

//login
test("Login Test", async ({ browser }) => {
  const email = "sibangiboxipatro@gmail.com";
  const context = await browser.newContext();
  const page = await context.newPage();
  const products = page.locator(".card-body");
  const productName = "ZARA COAT 3";
  const cardTitle = page.locator(".card-body b");
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  console.log(await page.title());
  await expect(page).toHaveTitle("Let's Shop");

  await page.locator("#userEmail").fill(email);
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

  //Shipping Information email
  await expect(page.locator(".user__name [type='text']").first()).toHaveText(
    email,
  );

  //place order button
  await page.locator(".action__submit").click();

  //order confirmation page
  await expect(page.locator(".hero-primary")).toHaveText(
    " Thankyou for the order. ",
  );

  //grab order id
  const orderId = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();
  console.log(orderId);

  //opening orders page
  await page.locator("button[routerlink*='/dashboard/myorders']").click();
  await page.locator("tbody").waitFor();

  //find order
  const rows = await page.locator("tbody tr");
  for (let i = 0; i < (await rows.count()); i++) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }

  //after view button is clicked
  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();

  await page.pause();
});

test("Page Playwright test", async ({ page }) => {
  await page.goto("https://google.com");
  //get title - assertion
  console.log(await page.title());
  await expect(page).toHaveTitle("Google");
});
