//pass test data as fixture by extend test annotation behaviour
import { test as baseTest } from "@playwright/test";

interface TestDataForOrder {
  username: string;
  password: string;
  productName: string;
}
export const customTest = baseTest.extend<{
  testDataForOrder: TestDataForOrder;
}>({
  //custom fixture
  testDataForOrder: {
    username: "sibangiboxipatro@gmail.com",
    password: "Sibangi@123",
    productName: "ZARA COAT 3",
  },
});
