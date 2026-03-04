import { test, expect } from "@playwright/test";

test("End-to-End E-Commerce Flow", async ({ page, context }) => {
  const productName = "ZARA COAT 3";
  let orderId = null;

  // 1️ Login
  await page.goto("https://rahulshettyacademy.com/client");

  await expect(page.locator("#userEmail")).toBeVisible();

  await page.locator("#userEmail").fill("sibangiboxipatro@gmail.com");
  await page.locator("#userPassword").fill("Sibangi@123");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();

  // Add Product Dynamically
  const products = page.locator(".card-body");
  await expect(products.first()).toBeVisible();

  const count = await products.count();

  for (let i = 0; i < count; i++) {
    const title = await products.nth(i).locator("b").textContent();

    if (title && title.trim() === productName) {
      await products
        .nth(i)
        .getByRole("button", { name: "Add To Cart" })
        .click();
      break;
    }
  }

  //  Validate Cart
  await page.locator("[routerlink*='cart']").click();

  await expect(page.locator(`h3:has-text("${productName}")`)).toBeVisible();

  //  Checkout
  await page.getByRole("button", { name: "Checkout" }).click();

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

  await page.getByText("Place Order").click();

  await expect(page.locator(".hero-primary")).toHaveText(
    " Thankyou for the order. ",
  );

  orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();

  console.log("Order ID:", orderId);

  //  Validate in Order History
  await page.getByRole("button", { name: "Orders" }).click();

  const rows = page.locator("tbody tr");
  await expect(rows.first()).toBeVisible();

  const rowCount = await rows.count();

  for (let i = 0; i < rowCount; i++) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();

    if (orderId && rowOrderId && orderId.includes(rowOrderId.trim())) {
      await rows.nth(i).getByRole("button", { name: "View" }).click();
      break;
    }
  }

  const orderDetailsId = await page.locator(".col-text").textContent();

  expect(orderId.includes(orderDetailsId.trim())).toBeTruthy();

  //  Handle Child Window
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    page.locator("[href*='documents-request']").click(),
  ]);

  await newPage.waitForLoadState();

  const childText = await newPage.locator(".red").textContent();
  console.log("Child Window Text:", childText);
});
