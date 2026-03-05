const { test, expect } = require("@playwright/test");

test("Heroku App Testing", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com");

  //Form-Authentication(login page)
  await page.getByRole("link", { name: "Form Authentication" }).click();
  await page.getByLabel("Username").fill("tomsmith");
  await page.getByLabel("Password").fill("SuperSecretPassword!");
  await page.getByRole("button", { name: " Login" }).click();

  //Validate heading after login
  await expect(
    page.getByRole("heading", { name: "Secure Area", exact: true }),
  ).toBeVisible();

  //Navigate back to home page
  await page.goto("https://the-internet.herokuapp.com");

  //Dropdown handling
  await page.getByRole("link", { name: "Dropdown" }).click();
  await page.locator("#dropdown").selectOption("Option 1");
  await expect(page.locator("#dropdown")).toHaveValue("1");

  //Navigate back to home page
  await page.goto("https://the-internet.herokuapp.com");

  // Checkbox Handling
  await page.getByRole("link", { name: "Checkboxes" }).click();

  const checkbox1 = page.locator("[type = 'checkbox']").nth(0);
  const checkbox2 = page.locator("[type = 'checkbox']").nth(1);

  await checkbox1.check();
  await checkbox2.uncheck();

  await expect(checkbox1).toBeChecked();
  await expect(checkbox2).not.toBeChecked();
});
