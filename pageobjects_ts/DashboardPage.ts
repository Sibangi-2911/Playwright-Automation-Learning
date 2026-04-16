import { expect, type Locator, type Page } from "@playwright/test";
export class DashboardPage {
  page: Page;
  products: Locator;
  productsText: Locator;
  constructor(page: Page) {
    this.page = page;
    this.products = page.locator(".card-body");
    this.productsText = page.locator(".card-body b");
  }

  async addProductToCart(productName: string) {
    await this.page.locator(".card-body b").first().waitFor();
    const allTitles = await this.productsText.allTextContents();
    console.log(allTitles);
    await this.products
      .filter({ hasText: productName })
      .getByRole("button", { name: "Add To Cart" })
      .click();
  }

  async navigateToCart() {
    // wait for spinner to disappear
    await this.page
      .locator(".ngx-spinner-overlay")
      .waitFor({ state: "hidden" });

    // ✅ scope to navigation (fixes strict mode)
    await this.page
      .locator("nav")
      .getByRole("button", { name: /Cart/ })
      .click();
  }
}

module.exports = { DashboardPage };
