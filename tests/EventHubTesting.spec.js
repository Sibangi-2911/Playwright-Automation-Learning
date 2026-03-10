const { test, expect } = require("@playwright/test");

const BASE_URL = "https://eventhub.rahulshettyacademy.com";

//login helper function
async function login(page) {
  await page.goto(`${BASE_URL}/login`);
  await page
    .getByPlaceholder("you@email.com")
    .fill("sibangiboxipatro@gmail.com");
  await page.getByLabel("Password").fill("Sibangi@123");
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(
    page.getByRole("link", { name: "Browse Events →" }),
  ).toBeVisible();
}

//future date value helper
function futureDateValue() {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return date.toISOString().slice(0, 16);
}

test("Create event → Book event → Verify seat reduction", async ({ page }) => {
  //Step 1 — Login
  await login(page);

  //Step 2 — Create a new event
  await page.goto(`${BASE_URL}/admin/events`);

  const eventTitle = `Test Event ${Date.now()}`;
  await page.locator("#event-title-input").fill(eventTitle);
  await page
    .locator("#admin-event-form textarea")
    .fill("Automation test event description");
  await page.getByLabel("City").fill("Bhubaneswar");
  await page.getByLabel("Venue").fill("Test Venue");
  await page.getByLabel("Event Date & Time").fill(futureDateValue());
  await page.getByLabel("Price ($)").fill("100");
  await page.getByLabel("Total Seats").fill("50");
  await page.locator("#add-event-btn").click();
  await expect(page.getByText("Event created!")).toBeVisible();

  //Step 3 — Find the event card and capture seats
});
