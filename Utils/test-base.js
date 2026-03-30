//pass test data as fixture by extend test annotation behaviour
const base = require("@playwright/test");

exports.customTest = base.test.extend({
  //custom fixture
  testDataForOrder: {
    username: "sibangiboxipatro@gmail.com",
    password: "Sibangi@123",
    productName: "ZARA COAT 3",
  },
});
