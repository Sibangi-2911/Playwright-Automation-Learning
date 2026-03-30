//End to end page object test
const { test, expect } = require("@playwright/test");
const { POManager } = require("../pageobjects/POManager");

test.only("Login Test", async ({ browser }) => {
  const username = "sibangiboxipatro@gmail.com";
  const password = "Sibangi@123";
  const context = await browser.newContext();
  const page = await context.newPage();
  const poManager = new POManager(page);

  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(username, password);

  const productName = "ZARA COAT 3";
  await expect(page).toHaveTitle("Let's Shop");
  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.addProductToCart(productName);
  await dashboardPage.navigateToCart();

  const cartPage = poManager.getCartPage();
  await cartPage.verifyProductInCart(productName);
  await cartPage.proceedToCheckout();

  const checkoutPage = poManager.getCheckoutPage();
  await checkoutPage.fillCardDetails();
  await checkoutPage.applyCoupon("rahulshettyacademy");
  await checkoutPage.selectExpiry("03", "27");
  await checkoutPage.selectCountry();
  await expect(checkoutPage.getUserEmailField()).toHaveValue(username);
  await checkoutPage.placeOrder();

  //order confirmation page
  await expect(page.getByText("Thankyou for the order.")).toBeVisible();

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
