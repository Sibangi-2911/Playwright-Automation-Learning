// End to End Example of downloading file--->updating file----->uploading file with playwright test
const { test, expect } = require("@playwright/test");
const ExcelJS = require("exceljs");

async function writeExcelTest(searchText, replaceText, change, filePath) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet("Sheet1");
  const output = await readExcel(worksheet, searchText);
  const cell = worksheet.getCell(output.row, output.column + change.colChange);
  cell.value = replaceText;
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

test("upload download excel validation", async ({ page }) => {
  const textSearch = "Mango";
  const updateValue = "350";
  await page.goto(
    "https://rahulshettyacademy.com/upload-download-test/index.html",
  );
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download" }).click();
  //const download =
  await downloadPromise;
  // const filePath = "C:/Users/Sibangi Boxipatro/Downloads/download.xlsx";
  // await download.saveAs(filePath);
  await writeExcelTest(
    textSearch,
    updateValue,
    { rowChange: 0, colChange: 2 },
    "C:/Users/Sibangi Boxipatro/Downloads/download.xlsx",
  );
  await page.locator("#fileinput").click();
  await page
    .locator("#fileinput")
    .setInputFiles("C:/Users/Sibangi Boxipatro/Downloads/download.xlsx");
  const textlocator = page.getByText(textSearch);
  const desiredRow = await page.getByRole("row").filter({ has: textlocator });
  await expect(desiredRow.locator("#cell-4-undefined")).toContainText(
    updateValue,
  );
});
