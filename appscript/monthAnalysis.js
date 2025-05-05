const computeReportData = () => {
  const savingsData = getSheetData("savings").data;
  const loansData = getSheetData("loans").data;
  const loanRepayData = getSheetData("loanRepay").data;
  const expendituresData = getSheetData("expenditures").data;
  const interestData = getSheetData("interest").data;
  const accountsData = getSheetData("accounts").data;
  const { data: monthlyMetrics } = getSheetData("Monthly metrics");

  const monthlyMetricsData = getMonthlyMetricsData(monthlyMetrics);
  const executiveSammaryTable = createTableHtml(
    Object.entries(monthlyMetricsData)
  );

  const accountsDataTable = createTableHtml(accountsData); //General member accounts

  //LOANS TABLES
  const monthlyLoansData = filterByDateRange(loansData);
  const monthlyLoansDataTable = getLoansTable(monthlyLoansData);

  const activeLoansData = filterbyStatus(loansData, "active");
  const activeLoansTable = getLoansTable(activeLoansData);

  const overdueLoansData = filterbyStatus(loansData, "overdue");
  const overdueLoansTable = getLoansTable(overdueLoansData);

  const monthlyLoansRepayData = filterByDateRange(loanRepayData);
  const monthlyLoansRepayTable = createTableHtml(monthlyLoansRepayData);

  const monthlyInterestData = filterByDateRange(interestData);

  //SAVINGS AND EXPENSES TABLES
  const monthlySavingsData = filterByDateRange(savingsData);
  const monthLySavingsTable = createTableHtml(monthlySavingsData);

  const monthlyExpensesData = filterByDateRange(expendituresData);
  const monthlyExpensesTable = createTableHtml(monthlyExpensesData);

  return {
    accountsDataTable,
    monthlyLoansDataTable,
    activeLoansTable,
    overdueLoansTable,
    monthlyLoansRepayTable,
    monthLySavingsTable,
    monthlyExpensesTable,
    executiveSammaryTable,
    monthlyMetricsData,
  };
};

const getMonthlyMetricsData = (metrics) => {
  const { financialYear, accountingMonthName } = getFinancialYearAndMonth();
  const headers = metrics[0];
  const monthColumn = headers.indexOf("Month");
  const financialYearColumn = headers.indexOf("Financial year");

  const monthlyMetricsRecord = metrics
    .slice(1)
    .find(
      (row) =>
        row[monthColumn] === accountingMonthName &&
        row[financialYearColumn] === financialYear
    );

  if (!monthlyMetricsRecord) return {};

  const monthlyMetricsObject = headers.reduce((obj, header, index) => {
    obj[header] = monthlyMetricsRecord[index];
    return obj;
  }, {});

  return monthlyMetricsObject;
};
