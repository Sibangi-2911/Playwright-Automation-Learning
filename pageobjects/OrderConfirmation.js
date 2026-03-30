class OrderConfirmation {
  constructor(page) {
    this.page = page;
    this.orderSuccessMessage = page.getByText("Thankyou for the order.");
    this.orderIdText = page.locator(".em-spacer-1 .ng-star-inserted");
  }

  verifyOrderConfirmation() {
    return this.orderSuccessMessage;
  }
  async getOrderId() {
    const orderId = await this.orderIdText.textContent();
    return orderId.trim();
  }
}
module.exports = { OrderConfirmation };
