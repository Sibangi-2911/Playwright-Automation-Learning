class LoginPage {
  constructor(page) {
    this.page = page;
    this.signInbutton = page.getByRole("button", { name: "login" });
    this.userName = page.getByPlaceholder("email@example.com");
    this.password = page.getByPlaceholder("enter your passsword");
  }

  //Reusable utility for login-------> actions performed in the login page included here
  async goTo() {
    await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await this.page.waitForLoadState("networkidle"); // ✅ ensures page is stable
  }
  async validLogin(username, password) {
    //data comes from test
    await this.userName.waitFor(); // ✅ ensure element is visible
    await this.userName.fill(username);
    await this.password.fill(password);
    await Promise.all([
      this.page.waitForNavigation(), // ✅ wait for login navigation
      this.signInbutton.click(),
    ]);
  }
}
module.exports = { LoginPage };
