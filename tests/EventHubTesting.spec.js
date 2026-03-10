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
  await page.goto(`${BASE_URL}/events`);
  const cards = page.locator("#event-card");
  await expect(cards.first()).toBeVisible();
  const eventCard = cards.filter({ hasText: eventTitle });
  await expect(eventCard).toBeVisible({ timeout: 5000 });
  const seatText = await eventCard.locator("text=/seat/i").innerText();
  const seatsBeforeBooking = parseInt(seatText.match(/\d+/)[0]);

  // Step 4 — Start booking
  await eventCard.locator('[data-testid="book-now-btn"]').click();

  // Step 5 — Fill booking form
  await expect(page.locator("#ticket-count")).toHaveText("1");
  await page.getByLabel("Full Name").fill("Sibangi");
  await page.locator("#customer-email").fill("sibangiboxipatro@gmail.com");
  await page.getByPlaceholder("+91 98765 43210").fill("9876543210");
  await page.locator("#confirm-booking").click();

  //Step 6 — Verify booking confirmation
  const bookingRefElement = page.locator(".booking-ref").first();
  await expect(bookingRefElement).toBeVisible();
  const bookingRef = (await bookingRefElement.innerText()).trim();

  // Step 7 — Verify in My Bookings
  await page.getByText("View My Bookings").click();
  await expect(page).toHaveURL(`${BASE_URL}/bookings`);
  const bookingCards = page.locator("#booking-card");
  await expect(bookingCards.first()).toBeVisible();
  const matchedCard = bookingCards.filter({
    has: page.locator(".booking-ref", { hasText: bookingRef }),
  });
  await expect(matchedCard).toBeVisible();
  await expect(matchedCard).toContainText(eventTitle);

  // Step 8 — Verify seat reduction
  await page.goto(`${BASE_URL}/events`);
  await expect(cards.first()).toBeVisible();
  const updatedCard = cards.filter({ hasText: eventTitle });
  await expect(updatedCard).toBeVisible();
  const updatedSeatText = await updatedCard.locator("text=/seat/i").innerText();
  const seatsAfterBooking = parseInt(updatedSeatText.match(/\d+/)[0]);
  await expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1);
});
