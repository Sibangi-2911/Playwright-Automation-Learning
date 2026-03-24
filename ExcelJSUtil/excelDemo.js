const ExcelJS = require("exceljs");

//create object of the class to access all the methods
const workbook = new ExcelJS.Workbook();

//path of the excel file--> used promise here that is then()
workbook.xlsx
  .readFile("C:/Users/Sibangi Boxipatro/Downloads/exceldownloadTest.xlsx")
  .then(function () {
    //1--> Tell which sheet you are working on
    const worksheet = workbook.getWorksheet("Sheet1");

    //print all values---> iterate over each row
    worksheet.eachRow((row, rowNumber) => {
      //inner loop---> for a particular cell
      row.eachCell((cell, colNumber) => {
        console.log(cell.value);
      });
    });
  });
