const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("../Utils/APIUtils");
const loginPayLoad = {
  userEmail: "sibangiboxipatro@gmail.com",
  userPassword: "Sibangi@123",
};
const orderPayLoad = {
  orders: [
    { country: "Cuba", productOrderedId: "6960eae1c941646b7a8b3ed3" },
    { country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" },
    { country: "Cuba", productOrderedId: "6960ea76c941646b7a8b3dd5" },
  ],
};
let response;

test.beforeAll(async () => {
  //Login API
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayLoad);

  //Create Order API
  response = await apiUtils.createOrder(orderPayLoad);
});

test("@Web Place the order", async ({ browser }) => {
  const context = await browser.newContext();
  //insert javascript inside this to add cookies to storage
  await context.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  const page = await context.newPage();

  const productName = "ZARA COAT 3";

  await page.goto("https://rahulshettyacademy.com/client/");

  await expect(page).toHaveTitle("Let's Shop");
  //wait mechanism in service based applications
  const cardTitle = page.locator(".card-body b");
  await page.locator(".card-body b").first().waitFor();
  const allTitles = await cardTitle.allTextContents();
  console.log(allTitles);

  //end to end automation testing
  //grab order id
  //opening orders page
  await page.locator("button[routerlink*='/dashboard/myorders']").click();
  await page.locator("tbody").waitFor();

  //find order
  const rows = await page.locator("tbody tr");
  for (let i = 0; i < (await rows.count()); i++) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (response.orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }

  //after view button is clicked
  const orderIdDetails = await page.locator(".col-text").textContent();
  await page.pause();
  expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

  await page.pause();
});

// Verify if order created is showing in history page
// precondition - create order
