const computeReportData = () => {
  const savingsData = getSheetData("savings");
  const loansData = getSheetData("loans");
  const loanRepayData = getSheetData("loanRepay");
  const expendituresData = getSheetData("expenditures");
  const accountsData = getSheetData("accounts");
  const interestData = getSheetData("interest");

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

  const metrics = {};
  metrics["Total Members"] = countRecords(accountsData) - 2; //Remove closed accounts, better solution LATER
  metrics["Membership fee"] = 400000; // remove hard coded value LATER
  metrics["Expected savings"] = metrics["Total Members"] * 20000; //Each member saves 20000 minimum
  metrics["No. of members who saved"] = countRecords(monthlySavingsData); //Members may save twice, resolve LATER
  metrics["Total savings collected"] = sumColumn(monthlySavingsData, "amount");
  metrics["Savings arrears"] =
    metrics["Expected savings"] - metrics["No. of members who saved"] * 20000;
  metrics["Cummulative savings"] = sumColumn(accountsData, "Savings");

  metrics["No. of Loans issued"] = countRecords(monthlyLoansData);
  metrics["Loans sum issued"] = sumColumn(monthlyLoansData, "amount");
  metrics["Loan sum Repaid"] = sumColumn(monthlyLoansRepayData, "amount");
  metrics["Outstanding Loan Bal"] = sumColumn(monthlyLoansData, "loanBalance");
  metrics["No. of active loans"] = countRecords(activeLoansData);
  metrics["No. of overdue loans"] = countRecords(overdueLoansData);
  metrics["Overdue Loan sum"] = sumColumn(overdueLoansData, "loanBalance");
  metrics["Total Interest recieved"] = sumColumn(monthlyInterestData, "amount");
  metrics["Cumulative interest"] = sumColumn(interestData, "amount");
  metrics["Total expenses this month"] = sumColumn(
    monthlyExpensesData,
    "amount"
  );
  metrics["Cummulative expenses"] = sumColumn(expendituresData, "amount");
  metrics["Bank Balance"] =
    metrics["Cummulative savings"] +
    metrics["Cumulative interest"] -
    metrics["Cummulative expenses"] +
    metrics["Membership fee"] -
    metrics["Outstanding Loan Bal"];

  const executiveSammaryTable = createTableHtml(Object.entries(metrics));
  const summaryData = metrics;

  return {
    accountsDataTable,
    monthlyLoansDataTable,
    activeLoansTable,
    overdueLoansTable,
    monthlyLoansRepayTable,
    monthLySavingsTable,
    monthlyExpensesTable,
    executiveSammaryTable,
    summaryData,
  };
};
