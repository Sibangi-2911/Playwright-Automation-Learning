// Assignment to be done: Cross-User Booking Access  is denied
//What you are testing: User A (Yahoo) creates a booking via a direct API call — no browser UI involved. User B (Gmail) logs in through the browser and tries to open that booking's URL directly. User B must see an "Access Denied" error.

const { test, expect, request } = require("@playwright/test");

const BASE_URL = "https://eventhub.rahulshettyacademy.com";
const API_URL = "https://api.eventhub.rahulshettyacademy.com/api";

// Dummy users
const YAHOO_USER = {
  email: "yahoo_user@test.com",
  password: "Test@123",
};

const GMAIL_USER = {
  email: "gmail_user@test.com",
  password: "Test@123",
};

// UI login helper
async function loginAs(page, user) {
  await page.goto(`${BASE_URL}/login`);

  await page.getByPlaceholder("you@email.com").fill(user.email);
  await page.getByLabel("Password").fill(user.password);
  await page.getByRole("button", { name: "Sign In" }).click();

  await page.waitForLoadState("networkidle");
}

test("Cross-User Booking Access Denied", async ({ page, request }) => {
  // ---------------- STEP 1: Login as Yahoo via API ----------------
  // Login
  const loginRes = await request.post(`${API_URL}/auth/login`, {
    data: {
      email: YAHOO_USER.email,
      password: YAHOO_USER.password,
    },
  });

  expect(loginRes.ok()).toBeTruthy();

  const loginData = await loginRes.json();
  const token = loginData.token;

  // ---------------- STEP 2: Get Event ID ----------------
  const eventsRes = await request.get(`${API_URL}/events`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  expect(eventsRes.ok()).toBeTruthy();

  const eventsData = await eventsRes.json();
  const eventId = eventsData.data[0].id;

  // ---------------- STEP 3: Create Booking ----------------
  const bookingRes = await request.post(`${API_URL}/bookings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      eventId: eventId,
      customerName: "Yahoo User",
      customerEmail: YAHOO_USER.email,
      customerPhone: "9999999999",
      quantity: 1,
    },
  });

  expect(bookingRes.ok()).toBeTruthy();

  const bookingData = await bookingRes.json();
  const yahooBookingId = bookingData.data.id;

  // ---------------- STEP 4: Login as Gmail (UI) ----------------
  await loginAs(page, GMAIL_USER);

  // ---------------- STEP 5: Try to access Yahoo booking ----------------
  await page.goto(`${BASE_URL}/bookings/${yahooBookingId}`, {
    waitUntil: "networkidle",
  });

  // ---------------- STEP 6: Validate Access Denied ----------------
  await expect(page.getByText("Access Denied")).toBeVisible();
  await expect(
    page.getByText("You are not authorized to view this booking"),
  ).toBeVisible();
});
