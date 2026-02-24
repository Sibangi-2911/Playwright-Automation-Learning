const { test, expect } = require("@playwright/test");

test("Browser Context Playwright test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const userName = page.locator("#username");
  const signIn = page.locator("#signInBtn");
  const cardTitles = page.locator(".card-body a");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(page.title());

  //css selector for identifying edit box
  await userName.fill("rahulshetty");
  await page.locator("[type = 'password']").fill("Learning@830$3mK2");
  await signIn.click();
  console.log(await page.locator("[style *= 'block']").textContent());
  await expect(page.locator("[style *= 'block']")).toContainText("Incorrect");

  //enter valid credentials and erase existing ones
  await userName.fill("");
  await userName.fill("rahulshettyacademy");
  await signIn.click();
  console.log(await cardTitles.first().textContent());
  console.log(await cardTitles.nth(1).textContent());
  console.log(await cardTitles.last().textContent());
  //to get all the titles of the card
  const allTitles = await cardTitles.allTextContents();
  console.log(allTitles);
});

test("UI Controls", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const userName = page.locator("#username");
  const signIn = page.locator("#signInBtn");
  const documentLink = page.locator('[href*="documents-request"]');

  //dropdown
  const dropdown = page.locator("select.form-control");
  await dropdown.selectOption("consult");

  //radio button
  await page.locator(".radiotextsty").nth(1).click();
  await page.locator("#okayBtn").click();

  //to ensure that the radio btn is checked
  console.log(page.locator(".radiotextsty").last().isChecked());
  await expect(page.locator(".radiotextsty").last()).toBeChecked();

  //checkbox
  await page.locator("#terms").click();
  await expect(page.locator("#terms")).toBeChecked();
  await page.locator("#terms").uncheck();
  expect(await page.locator("#terms").isChecked()).toBeFalsy();

  //blinking text
  await expect(documentLink).toHaveAttribute("class", "blinkingText");

  //await page.pause(); //execution will pause before closing , as it is very fast
});

test.only("Child Windows Handling", async ({ browser }) => {
  //original page
  const context = await browser.newContext();
  const page = await context.newPage();
  const userName = page.locator("#username");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const documentLink = page.locator('[href*="documents-request"]');

  //new page
  const [newPage] = await Promise.all([
    context.waitForEvent("page"), //this has to wait for any page is opening in background
    documentLink.click(),
  ]); //new page opened

  const text = await newPage.locator(".red").textContent();
  const arrayText = text.split("@");
  const domain = arrayText[1].split(" ")[0];
  console.log(domain);
  //place this domain name in the original page username
  await page.locator("#username").fill(domain);
  await page.pause();
  console.log(await page.locator("#username").inputValue());
});
