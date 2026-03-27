class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator("div li");
    this.checkoutBtn = page.getByRole("button", { name: "Checkout" });
  }

  async verifyProductInCart(productName) {
    await this.cartItems.first().waitFor(); //becoz isVisible doesn't support auto wait
    await this.page.getByText(productName).waitFor();
  }

  async proceedToCheckout() {
    await this.checkoutBtn.click();
  }
}

module.exports = { CartPage };
