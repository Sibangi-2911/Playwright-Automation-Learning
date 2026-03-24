const ExcelJS = require("exceljs");

//wrapped the code in asynchronous function
async function excelTest() {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(
    "C:/Users/Sibangi Boxipatro/Downloads/exceldownloadTest.xlsx",
  );
  const worksheet = workbook.getWorksheet("Sheet1");
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      console.log(cell.value);
    });
  });
}
excelTest();
