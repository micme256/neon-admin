const updateMonthlyMetrics = () => {
  const savingsData = getSheetData("savings").data;
  const loansData = getSheetData("loans").data;
  const loanRepayData = getSheetData("loanRepay").data;
  const expendituresData = getSheetData("expenditures").data;
  const interestData = getSheetData("interest").data;
  const { data: monthMetricsData, sheet: monthMetricsSheet } =
    getSheetData("Monthly metrics");

  const metrics = {};
  const monthlyLoansData = filterByDateRange(loansData);
  const activeLoansData = filterbyStatus(loansData, "active");
  const overdueLoansData = filterbyStatus(loansData, "overdue");
  const monthlyInterestData = filterByDateRange(interestData);
  const monthlySavingsData = filterByDateRange(savingsData);
  const monthlyExpensesData = filterByDateRange(expendituresData);

  const { financialYear, accountingMonthName } = getFinancialYearAndMonth();

  const monthlyLoansRepayData = filterByDateRange(loanRepayData);

  metrics["Total Members"] = 15;
  metrics["Financial year"] = financialYear;
  metrics["month"] = accountingMonthName;
  metrics["Opening Balance"] = getOpeningBalance(monthMetricsData);
  metrics["Loans Disbursed Count"] = countRecords(monthlyLoansData);
  metrics["Loans Disbursed Amount"] = sumColumn(monthlyLoansData, "amount");
  metrics["Loans Repaid Amount"] = sumColumn(monthlyLoansRepayData, "amount");
  metrics["Active Loan Balance"] = sumColumn(activeLoansData, "loanBalance");
  metrics["Active Loans Count"] = countRecords(activeLoansData);
  metrics["Overdue Loans Count"] = countRecords(overdueLoansData);
  metrics["Overdue Loans Amount"] = sumColumn(overdueLoansData, "loanBalance");
  metrics["Outstanding Loans Amount"] =
    metrics["Active Loan Balance"] + metrics["Overdue Loans Amount"];
  metrics["Interest Received Total"] = sumColumn(monthlyInterestData, "amount");
  metrics["Total Expenses Incurred"] = sumColumn(monthlyExpensesData, "amount");
  metrics["Expected Savings"] = metrics["Total Members"] * 20000; // Each member saves 20000 minimum
  metrics["Members Who Saved Count"] = countRecords(monthlySavingsData); // Members may save twice, resolve LATER
  metrics["Total Savings Collected"] = sumColumn(monthlySavingsData, "amount");
  metrics["Savings Arrears Amount"] =
    metrics["Expected Savings"] - metrics["Members Who Saved Count"] * 20000;

  Logger.log("Opening Balance: " + metrics["Opening Balance"]);
  Logger.log("Total Savings Collected: " + metrics["Total Savings Collected"]);
  Logger.log("Interest Received Total: " + metrics["Interest Received Total"]);
  Logger.log("Total Expenses Incurred: " + metrics["Total Expenses Incurred"]);
  Logger.log("Loans Repaid Amount: " + metrics["Loans Repaid Amount"]);
  Logger.log("Loans Disbursed Amount: " + metrics["Loans Disbursed Amount"]);

  metrics["Ending Balance"] =
    metrics["Opening Balance"] +
    metrics["Total Savings Collected"] +
    metrics["Interest Received Total"] -
    metrics["Total Expenses Incurred"] +
    metrics["Loans Repaid Amount"] -
    metrics["Loans Disbursed Amount"];
  Logger.log("Ending Balance: " + metrics["Ending Balance"]);

  addMetricsToSheet(metrics, monthMetricsSheet, monthMetricsData);
};

const getOpeningBalance = (monthMetricsData) => {
  const headerRow = monthMetricsData[0];
  const endingBalanceIndex = headerRow.indexOf("Ending Balance");

  if (endingBalanceIndex === -1) {
    throw new Error("Ending Balance column not found.");
  }

  const lastRecord = monthMetricsData[monthMetricsData.length - 1];
  return lastRecord[endingBalanceIndex].replace(/,/g, "");
};

const addMetricsToSheet = (metrics, sheet, data) => {
  const headers = data[0];
  const newRow = headers.map((header) => metrics[header]);
  sheet.appendRow(newRow);
};

const getFinancialYearAndMonth = () => {
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  // Determine financial year
  let financialYear;
  if (currentMonth < 3) {
    financialYear = `${today.getFullYear() - 1}-${today.getFullYear()}`;
  } else {
    financialYear = `${today.getFullYear()}-${today.getFullYear() + 1}`;
  }

  // Determine accounting month
  let accountingMonth;
  if (currentDay < 8) {
    accountingMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  } else {
    accountingMonth = currentMonth;
  }
  // Get month name
  const monthNames = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];
  const accountingMonthName = monthNames[accountingMonth - 1];

  return { financialYear, accountingMonthName };
};
