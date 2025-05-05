const getMonthlyMetricChartImages = () => {
  const sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Monthly metrics");
  const charts = sheet.getCharts();
  const chartTitles = [
    "Loans Disbursed Count",
    "Loans Disbursed Amount",
    "Loans Repaid Amount",
    "Active Loans Count",
    "Active Loan Balance",
    "Overdue Loans Count",
    "Overdue Loans Amount",
    "Outstanding Loans Amount",
    "Interest Received Total",
    "Total Expenses Incurred",
    "Total Savings Collected",
  ];

  const chartImageTags = {};

  chartTitles.forEach((title, index) => {
    if (charts[index]) {
      const blob = charts[index].getAs("image/png");
      const base64 = Utilities.base64Encode(blob.getBytes());
      const imageTag =
        "<img src='data:image/png;base64," +
        base64 +
        "' style='display:block; margin:auto; width:700px;' />";
      chartImageTags[title] = imageTag;
    } else {
      chartImageTags[title] =
        "<p style='text-align:center; color:red;'>Chart missing for " +
        title +
        "</p>";
    }
  });

  return chartImageTags;
};
