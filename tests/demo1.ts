import { expect, type Locator, type Page } from "@playwright/test";
export {};
let message1: string = "Hello";
message1 = "Bye";
console.log(message1);

let age1: number = 20;
let isActive: boolean = false;
console.log(age1);
let numbers1: number[] = [1, 2, 3];
console.log(numbers1);
//if not sure of datatype use any
let data: any = "This could be anything";
data = 42;
console.log(data);
console.log(typeof data);

function add(a: number, b: number): number {
  return a + b;
}
console.log(add(3, 4));

//object declaration - in ts we cannot add properties dynamically but f written can be compiled
let user: { name: string; age: number } = { name: "Bob", age: 34 };

//class
class CartPage {
  page: Page;
  cartItems: Locator;
  checkoutBtn: Locator;
  constructor(page: any) {
    this.page = page;
    this.cartItems = page.locator("div li"); // ideally improve selector if possible
    this.checkoutBtn = page.getByRole("button", { name: "Checkout" });
  }
}
