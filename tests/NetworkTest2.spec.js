const { test, expect } = require("@playwright/test");

test("Security test request intercept", async ({ browser }) => {
  //login  and reach orders page
  const email = "sibangiboxipatro@gmail.com";
  const context = await browser.newContext();
  const page = await context.newPage();
  const products = page.locator(".card-body");
  const productName = "ZARA COAT 3";
  const cardTitle = page.locator(".card-body b");
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  console.log(await page.title());
  await expect(page).toHaveTitle("Let's Shop");

  await page.getByPlaceholder("email@example.com").fill(email);
  await page.getByPlaceholder("enter your passsword").fill("Sibangi@123");
  await page.getByRole("button", { name: "login" }).click();

  //wait mechanism in service based applications
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();
  const allTitles = await cardTitle.allTextContents();
  console.log(allTitles);

  //opening orders page
  await page.locator("button[routerlink*='/dashboard/myorders']").click();
  await page.locator("tbody").waitFor();

  //Intercepting the request
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    (route) =>
      route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=654359890e453322",
      }),
  );
  await page.locator("button:has-text('View')").first().click();
  await expect(page.locator("p").last()).toHaveText(
    "You are not authorize to view this order",
  );
});
