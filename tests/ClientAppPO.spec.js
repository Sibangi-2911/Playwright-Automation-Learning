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
  const orderConfirmation = poManager.getOrderConfirmationPage();
  await expect(orderConfirmation.verifyOrderConfirmation()).toBeVisible();

  //grab order id
  const orderId = await orderConfirmation.getOrderId();
  console.log("Order ID: ", orderId);

  //opening orders page
  const ordersPage = poManager.getOrdersPage();
  await ordersPage.goToOrdersPage();
  await ordersPage.selectOrderById(orderId);

  const orderIdDetails = await ordersPage.getOrderIdDetails();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();
  await page.pause();
});

test("Page Playwright test", async ({ page }) => {
  await page.goto("https://google.com");
  //get title - assertion
  console.log(await page.title());
  await expect(page).toHaveTitle("Google");
});
