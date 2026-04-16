import { expect, type Locator, type Page } from "@playwright/test";
export class CheckoutPage {
  page: Page;
  expiryDropdowns: Locator;
  constructor(page: Page) {
    this.page = page;
    this.expiryDropdowns = page.locator(
      ".field:has-text('Expiry Date') select",
    );
  }
  async fillCardDetails() {
    //credit card field
    await this.page
      .locator(".field:has-text('Credit Card Number') input")
      .fill("4542993192922293");

    //cvv code
    await this.page.locator(".field:has-text('CVV Code') input").fill("204");

    //Name on card
    await this.page
      .locator(".field:has-text('Name on Card') input")
      .fill("SIBANGI BOXIPATRO");
  }

  async applyCoupon(code: string) {
    await this.page.locator("[name*='coupon']").fill(code);
    await this.page.locator("[type = 'submit']").click();
  }

  async selectExpiry(month: string, date: string) {
    //Expiry date dropdown
    await this.expiryDropdowns.first().selectOption(month);
    await this.expiryDropdowns.nth(1).selectOption(date);
  }

  async selectCountry() {
    //Shipping Information suggestive dropdown
    const country = this.page.getByPlaceholder("Select Country");
    await country.click();
    await country.pressSequentially("ind", { delay: 150 });

    await this.page.getByRole("button", { name: "India" }).nth(1).click();
  }

  getUserEmailField() {
    return this.page.locator(".user__name").locator("input[type='text']");
  }

  async placeOrder() {
    await this.page.getByText("Place Order").click();
  }
}
module.exports = { CheckoutPage };
