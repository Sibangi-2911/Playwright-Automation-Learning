import { expect, type Locator, type Page } from "@playwright/test";

export class CartPage {
  page: Page;
  cartItems: Locator;
  checkoutBtn: Locator;
  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator("div li"); // ideally improve selector if possible
    this.checkoutBtn = page.getByRole("button", { name: "Checkout" });
  }

  async verifyProductInCart(productName: string) {
    const product = this.cartItems.filter({ hasText: productName });
    await expect(product).toBeVisible(); // auto-wait + assertion
  }

  async proceedToCheckout() {
    await expect(this.checkoutBtn).toBeVisible(); // stability
    await this.checkoutBtn.click();
  }
}

module.exports = { CartPage };
