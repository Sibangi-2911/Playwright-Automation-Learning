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
      //console.log(cell.value);

      //To find the desired text in the excel sheet
      if (cell.value === "Apple") {
        console.log(rowNumber);
        console.log(colNumber);
      }
    });
  });
}
excelTest();
