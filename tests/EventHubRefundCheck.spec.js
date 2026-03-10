const { test, expect } = require("@playwright/test");

const BASE_URL = "https://eventhub.rahulshettyacademy.com";

//login helper function
async function loginAndGoToBooking(page) {
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

//TEST 1 — Single Ticket Booking → Eligible for Refund
test("Single ticket booking should be eligible for refund", async ({
  page,
}) => {
  //Step 1 — Login
  await loginAndGoToBooking(page);

  // Step 2 — Book first event
  await page.goto(`${BASE_URL}/events`);
  const eventCard = page.locator('[data-testid="event-card"]').first();

  await eventCard.locator('[data-testid="book-now-btn"]').click();

  await page.getByLabel("Full Name").fill("Sibangi");
  await page.getByLabel("Email").fill("sibangiboxipatro@gmail.com");
  await page.getByLabel("Phone").fill("9876543210");

  await page.locator(".confirm-booking-btn").click();
  await expect(page.locator(".booking-ref")).toBeVisible();
  // Step 3 — Navigate to booking details
  await page.getByRole("link", { name: /view my bookings/i }).click();

  await expect(page).toHaveURL(`${BASE_URL}/bookings`);

  await Promise.all([
    page.waitForURL(/booking/i), // wait for details page
    page.getByText("View Details").first().click(),
  ]);

  await expect(page.getByText("Booking Information")).toBeVisible();

  // Step 4 — Validate booking reference
  await expect(page.getByText("Booking ID")).toBeVisible();

  const bookingRefLocator = page.getByText(/#[0-9]+/);
  await expect(bookingRefLocator).toHaveText(/#[0-9]+/);

  // Step 5 — Check refund eligibility

  await page
    .getByRole("button", {
      name: "Check eligibility for refund?",
    })
    .click();

  const spinner = page.locator("#refund-spinner");

  await expect(spinner).toBeVisible();

  await expect(spinner).toBeHidden({ timeout: 6000 });

  // Step 6 — Validate result

  const result = page.locator("#refund-result");

  await expect(result).toBeVisible();

  await expect(result).toContainText("Eligible for refund");

  await expect(result).toContainText(
    "Single-ticket bookings qualify for a full refund",
  );
});

// TEST 2 — Group Ticket Booking → NOT Eligible for Refund
test.only("Group ticket booking is NOT eligible for refund", async ({
  page,
}) => {
  // Step 1 — Login
  await loginAndGoToBooking(page);

  // Step 2 — Open events and book first event
  await page.goto(`${BASE_URL}/events`);

  const eventCard = page.locator('[data-testid="event-card"]').first();

  await eventCard.locator('[data-testid="book-now-btn"]').click();

  // Increase quantity to 3 tickets
  const incrementBtn = page.locator('button:has-text("+")');

  await incrementBtn.click();
  await incrementBtn.click();

  // Fill booking form
  await page.getByLabel("Full Name").fill("Sibangi");
  await page.getByLabel("Email").fill("sibangiboxipatro@gmail.com");
  await page.getByLabel("Phone").fill("9876543210");

  await page.locator(".confirm-booking-btn").click();

  await expect(page.locator(".booking-ref")).toBeVisible();

  // Step 3 — Navigate to booking details
  await page.getByRole("link", { name: /view my bookings/i }).click();

  await expect(page).toHaveURL(`${BASE_URL}/bookings`);

  await Promise.all([
    page.waitForURL(/booking/i),
    page.getByText("View Details").first().click(),
  ]);

  await expect(page.getByText("Booking Information")).toBeVisible();

  // Step 4 — Validate booking ID exists
  await expect(page.getByText("Booking ID")).toBeVisible();
  await expect(page.getByText(/#[0-9]+/)).toBeVisible();

  // Step 5 — Check refund eligibility
  await page
    .getByRole("button", { name: "Check eligibility for refund?" })
    .click();

  const spinner = page.locator("#refund-spinner");

  await expect(spinner).toBeVisible();
  await expect(spinner).toBeHidden({ timeout: 6000 });

  // Step 6 — Validate result (Not eligible)
  const result = page.locator("#refund-result");

  await expect(result).toBeVisible();

  await expect(result).toContainText("Not eligible for refund");

  await expect(result).toContainText(
    "Group bookings (3 tickets) are non-refundable",
  );
});
