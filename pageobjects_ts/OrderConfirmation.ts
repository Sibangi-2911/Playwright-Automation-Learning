import { expect, type Locator, type Page } from "@playwright/test";
export class OrderConfirmation {
  page: Page;
  orderSuccessMessage: Locator;
  orderIdText: Locator;
  constructor(page: Page) {
    this.page = page;
    this.orderSuccessMessage = page.getByText("Thankyou for the order.");
    this.orderIdText = page.locator(".em-spacer-1 .ng-star-inserted");
  }

  verifyOrderConfirmation() {
    return this.orderSuccessMessage;
  }
  async getOrderId() {
    const orderId = await this.orderIdText.textContent();
    return orderId?.trim();
  }
}
module.exports = { OrderConfirmation };
