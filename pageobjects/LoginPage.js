const { expect } = require("@playwright/test");

class LoginPage {
  constructor(page) {
    this.page = page;
    this.signInbutton = page.getByRole("button", { name: "Login" });
    this.userName = page.getByPlaceholder("email@example.com");
    this.password = page.getByPlaceholder("enter your passsword");
  }

  async goTo() {
    await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  }

  async validLogin(username, password) {
    await this.userName.fill(username);
    await this.password.fill(password);
    await this.signInbutton.click();

    // ✅ Wait for dashboard to load (reliable element)
    await this.page.locator(".card-body b").first().waitFor();

    // ✅ Scoped locator (fixes strict mode issue)
    await expect(
      this.page.locator("nav").getByRole("button", { name: /Cart/ }),
    ).toBeVisible();
  }
}

module.exports = { LoginPage };
