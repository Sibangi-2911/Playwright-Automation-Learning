//intercept- create fake environment for that session only to test something
const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("./Utils/APIUtils");
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
const fakePayLoadOrders = { data: [], message: "No Orders" };

test.beforeAll(async () => {
  //Login API
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayLoad);

  //Create Order API
  response = await apiUtils.createOrder(orderPayLoad);
});

test.only("Place the order", async ({ browser }) => {
  const context = await browser.newContext();
  //insert javascript inside this to add cookies to storage
  await context.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  const page = await context.newPage();

  const productName = "ZARA COAT 3";

  await page.goto("https://rahulshettyacademy.com/client/");

  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async (route) => {
      //First get the real response
      const response = await page.request.fetch(route.request()); //turning page mode to api request

      //Now send response to browser with fulfill method ----- create fake response
      let body = JSON.stringify(fakePayLoadOrders);
      route.fulfill({
        response,
        body,
      });
      //intercepting the response---> Api will give back the response and that {fake response} we will send it back to browser---->browser will render data in frontend
    },
  );

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
  await page.waitForResponse(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
  );
  console.log(await page.locator(".mt-4").textContent());
});
