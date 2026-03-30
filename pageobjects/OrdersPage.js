class OrdersPage {
  constructor(page) {
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
  async selectOrderById(orderId) {
    const count = await this.rows.count();

    for (let i = 0; i < count; i++) {
      const rowOrderId = await this.rows.nth(i).locator("th").textContent();

      if (orderId.includes(rowOrderId.trim())) {
        await this.rows.nth(i).locator("button").first().click();
        break;
      }
    }
  }

  // Get Order ID from details page
  async getOrderIdDetails() {
    const text = await this.orderIdDetails.textContent();
    return text.trim();
  }
}

module.exports = { OrdersPage };
