const ExcelJS = require("exceljs");

//wrapped the code in an asynchronous function
async function writeExcelTest(searchText, replacedText, change, filePath) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet("Sheet1");
  const output = await readExcel(worksheet, searchText);
  //Access the particular cell and update the text
  const cell = worksheet.getCell(output.row, output.column + change.colChange);
  cell.value = replacedText;
  await workbook.xlsx.writeFile(filePath);
}
async function readExcel(worksheet, searchText) {
  let output = { row: -1, column: -1 };
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      //console.log(cell.value);

      //To find the desired text in the excel sheet
      if (cell.value === searchText) {
        output.row = rowNumber;
        output.column = colNumber;
        console.log(rowNumber);
        console.log(colNumber);
      }
    });
  });
  return output;
}
//update mango price to 250
// writeExcelTest(
//   "Mango",
//   "Rabbit",
//   { rowChange: 0, colChange: 2 }, //object as a parameter to change the price
//   "C:/Users/Sibangi Boxipatro/Downloads/exceldownloadTest.xlsx",
// );

//update mango price to 250
writeExcelTest(
  "Rabbit",
  350,
  { rowChange: 0, colChange: 2 }, //object as a parameter to change the price
  "C:/Users/Sibangi Boxipatro/Downloads/exceldownloadTest.xlsx",
);
