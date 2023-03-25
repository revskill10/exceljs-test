const data = require("./data");
const XlsxPopupate = require("xlsx-populate");

async function generateReport() {
  const months = computeData();
  const wb = await XlsxPopupate.fromFileAsync("./template.xlsx");
  let referenceWorksheet = wb.sheet("02.21");
  for (const { month } of months) {
    wb.cloneSheet(referenceWorksheet, month + "_data");
  }
  return wb.outputAsync();
}

function computeData() {
  // Compute per month
  const months = [];
  const periods = [];
  let fd = data[0].predictDt;
  let sum = 0;
  let count = 0;
  for (const p of data) {
    if (p.predictDt.isSame(fd, "D")) {
      sum += p.predictValue;
      count++;
    } else {
      const mean = sum / count;
      periods.push({
        period: fd.format("DD.MM.YYYY"),
        meanPower: mean.toFixed(2)
      });
      if (!p.predictDt.isSame(fd, "month")) {
        months.push({
          month: fd.format("MM.YY"),
          periods
        });
      }
    }
    fd = p.predictDt;
  }
  return months;
}

module.exports = generateReport;
