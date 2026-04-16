import { expect, type Locator, type Page } from "@playwright/test";
export class OrdersPage {
  page: Page;
  ordersButton: Locator;
  ordersTable: Locator;
  rows: Locator;
  orderIdDetails: Locator;
  constructor(page: Page) {
    this.page = page;
    this.ordersButton = page.locator(
      "button[routerlink*='/dashboard/myorders']",
    );
    this.ordersTable = page.locator("tbody");
    this.rows = page.locator("tbody tr");
    this.orderIdDetails = page.locator(".col-text");
  }
  // Navigate to Orders Page
  async goToOrdersPage() {
    await this.ordersButton.click();
    await this.ordersTable.waitFor();
  }

  // Select order by ID and click View
  async selectOrderById(orderId: any) {
    const count = await this.rows.count();

    for (let i = 0; i < count; i++) {
      const rowOrderId = await this.rows.nth(i).locator("th").textContent();

      if (rowOrderId && orderId.includes(rowOrderId.trim())) {
        await this.rows.nth(i).locator("button").first().click();
        break;
      }
    }
  }

  // Get Order ID from details page
  async getOrderIdDetails() {
    const text = await this.orderIdDetails.textContent();
    return text?.trim();
  }
}

module.exports = { OrdersPage };
