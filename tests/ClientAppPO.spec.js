//End to end page object test
const { test, expect } = require("@playwright/test");
const { POManager } = require("../pageobjects/POManager");
//json-->string-->js object (conversion for  testdata)
const dataset = JSON.parse(
  JSON.stringify(require("../Utils/placeOrderTestData.json")),
);

//Parameterization in running tests
for (const data of dataset) {
  test.only(`Login Test for ${data.productName}`, async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username, data.password);

    await expect(page).toHaveTitle("Let's Shop");
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.addProductToCart(data.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.verifyProductInCart(data.productName);
    await cartPage.proceedToCheckout();

    const checkoutPage = poManager.getCheckoutPage();
    await checkoutPage.fillCardDetails();
    await checkoutPage.applyCoupon("rahulshettyacademy");
    await checkoutPage.selectExpiry("03", "27");
    await checkoutPage.selectCountry();
    await expect(checkoutPage.getUserEmailField()).toHaveValue(data.username);
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
}

test("Page Playwright test", async ({ page }) => {
  await page.goto("https://google.com");
  //get title - assertion
  console.log(await page.title());
  await expect(page).toHaveTitle("Google");
});
