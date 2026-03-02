const { test, expect } = require("@playwright/test");

test("End-to-End E-Commerce Flow", async (page) => {
  await page.goto("https://rahulshettyacademy.com/client");

  //Login using getByLabel() and getByRole()
  await page.getByLabel("Email").fill("sibangiboxipatro@gmail.com");
  await page.getByLabel("Password").fill("Sibangi@123");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();

  //Dynamically select a product and add to cart
});
