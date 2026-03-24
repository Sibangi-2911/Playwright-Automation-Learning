const ExcelJS = require("exceljs");

//wrapped the code in asynchronous function
async function excelTest() {
  let output = { row: -1, column: -1 };
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(
    "C:/Users/Sibangi Boxipatro/Downloads/exceldownloadTest.xlsx",
  );
  const worksheet = workbook.getWorksheet("Sheet1");
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      //console.log(cell.value);

      //To find the desired text in the excel sheet
      if (cell.value === "Banana") {
        output.row = rowNumber;
        output.column = colNumber;
        console.log(rowNumber);
        console.log(colNumber);
      }
    });
  });
  //Access the particular cell and update the text
  const cell = worksheet.getCell(output.row, output.column);
  cell.value = "Republic";
  await workbook.xlsx.writeFile(
    "C:/Users/Sibangi Boxipatro/Downloads/exceldownloadTest.xlsx",
  );
}
excelTest();
