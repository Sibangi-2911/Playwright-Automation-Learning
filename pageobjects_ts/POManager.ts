import { expect, type Locator, type Page } from "@playwright/test";
//const { LoginPage } = require("./LoginPage");
import { LoginPage } from "./LoginPage";
//const { DashboardPage } = require("./DashboardPage");
import { DashboardPage } from "./DashboardPage";
//const { CartPage } = require("./CartPage");
import { CartPage } from "./CartPage";
//const { CheckoutPage } = require("./CheckoutPage");
import { CheckoutPage } from "./CheckoutPage";
//const { OrderConfirmation } = require("./OrderConfirmation");
import { OrderConfirmation } from "./OrderConfirmation";
//const { OrdersPage } = require("./OrdersPage");
import { OrdersPage } from "./OrdersPage";

export class POManager {
  page: Page;
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  orderConfirmation: OrderConfirmation;
  ordersPage: OrdersPage;
  constructor(page: any) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.checkoutPage = new CheckoutPage(this.page);
    this.orderConfirmation = new OrderConfirmation(this.page);
    this.ordersPage = new OrdersPage(this.page);
  }

  getLoginPage() {
    return this.loginPage;
  }
  getDashboardPage() {
    return this.dashboardPage;
  }
  getCartPage() {
    return this.cartPage;
  }
  getCheckoutPage() {
    return this.checkoutPage;
  }
  getOrderConfirmationPage() {
    return this.orderConfirmation;
  }
  getOrdersPage() {
    return this.ordersPage;
  }
}

module.exports = { POManager };
