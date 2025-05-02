const monthPdfReport = () => {
  const date = new Date();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  const monthSummaryData = getSheetData("Monthly metrics");
  const summaryHeaders = monthSummaryData[0];
  const summaryValues = monthSummaryData[1];
  const keyValuePairs = summaryHeaders.map((key, index) => [
    key,
    summaryValues[index],
  ]);

  const monthlySummaryTable = createTableHtml(keyValuePairs);

  //COVERTING MONTHLY DATA TO EASILY READ VALUES
  const summaryData = summaryHeaders.reduce((acc, key, i) => {
    acc[key] = summaryValues[i];
    return acc;
  }, {});

  const accountsDataTable = getTableDirectly("accounts"); //General member accounts

  const loansData = getSheetData("loans");
  const activeLoansTable = getLoansTable(filterbyStatus(loansData, "active"));
  const overdueLoansTable = getLoansTable(filterbyStatus(loansData, "overdue"));
  const monthlyLoansDataTable = getLoansTable(filterByCurrentMonth(loansData));

  const monthLySavingsTable = monthlyDataTale("savings");
  const monthlyExpensesTable = monthlyDataTale("expenditures");

  let pdfContent =
    "<h1 style='text-align: center; font-family: Times New Roman; text-transform: uppercase;'>NEON SAVINGS ASSOCIATION</h1>";
  pdfContent +=
    "<p style='text-align: center; color: green; font-family: Times New Roman;'>\"Work smart, work together\"</p>";
  pdfContent += "<hr style='border-top: 3px solid red;'>";
  pdfContent +=
    "<p style=' text-align: right; font-family: Times New Roman;'><strong>DATE:</strong> " +
    formatDate(date) +
    "</p>";
  pdfContent +=
    "<h2 style ='text-align: center; font-family: Times New Roman; text-transform: uppercase;'>NEON MONTHLY FINANCIAL REPORT " +
    "(" +
    month +
    ")" +
    "</h2>";
  pdfContent +=
    "<p style ='text-align: left; font-family: Times New Roman;'><strong>Period: </strong> Month of " +
    month +
    "</p>";
  pdfContent +=
    "<h2 style='text-align: center; font-family: Times New Roman; text-transform: uppercase;'>EXECUTIVE SUMMARY</h2>";
  pdfContent += monthlySummaryTable;
  pdfContent +=
    "<h2 style='font-family: Times New Roman; text-transform: uppercase;'> 1. INTRODUCTION</h2>";
  pdfContent +=
    "<p style='text-align: left; font-family: Times New Roman;'>The NEON savings association Monthly Report provides a comprehensive overview of the financial activities of the fraternity and member engagement for " +
    month +
    " - " +
    year +
    ". This report highlights some key performance indicators, loan disbursements, savings mobilization among others showing our commitment to supporting the financial well-being of the members. </p>";
  pdfContent +=
    "<h2 style='font-family: Times New Roman; text-transform: uppercase;'> 2. MEMBERS ACCOUNTS OVERVIEW</h2>";
  pdfContent +=
    "<p style='text-align: left; font-family: Times New Roman;'>This is an overview of individual member accounts as of end of " +
    month +
    ". It includes the total savings and the current loan balances for each member.</p>";
  pdfContent +=
    "<p style='text-align: left; font-family: Times New Roman;'>The table below is a summary of all active members equity and liabilty status within the group. These figures help highlight individual contributions and financial positions, which support overall transparency and accountability in our financial operations.</p>";
  pdfContent +=
    "<p style='text-align: left; font-family: Times New Roman;'>All balances are reflected in Ugandan Shillings (UGX) and based on system records as of the last day of the month.</p>";
  pdfContent += accountsDataTable;
  pdfContent +=
    "<h2 style='font-family: Times New Roman; text-transform: uppercase;'>3. LOANS ISSUED IN " +
    month +
    "</h2>";
  pdfContent +=
    "<p style='text-align: left; font-family: Times New Roman;'>A total of " +
    summaryData["No. of Loans issued"] +
    " loan(s) were issued in " +
    month +
    " making a total of UGX " +
    summaryData["Loans sum issued"] +
    ". The group earned a total of UGX " +
    summaryData["Total Interest recieved"] +
    " from interest on loans issued before the begining of this month. In accordance to our loans policy, the society charges a 5% and a 3% monthly interest on instant loans and short-term loans respectively. Below is a table showing a summary for loans issued in this month.</p>";

  pdfContent += monthlyLoansDataTable;
  pdfContent +=
    "<h3 style=' font-family: Times New Roman; text-transform: uppercase;'>3.1. CURRENT ACTIVE LOANS</h3>";
  pdfContent +=
    "<p style='text-align: left; font-family: Times New Roman;'>These are all loans that remain <strong>active</strong> as of the end of " +
    month +
    "-" +
    year +
    ". There are currently " +
    summaryData["No. of active loans"] +
    " active loan(s) including " +
    summaryData["No. of overdue loans"] +
    " loan(s) that are overdue. These are loans that have been disbursed to members but are yet to be fully settled. Tracking active loans is essential to assess the group's current credit exposure, outstanding balances, and member obligations.</p>";
  pdfContent +=
    "<p style='text-align: left; font-family: Times New Roman;'>The table below outlines all current active loans, enabling the SACCO leadership to monitor performance, identify risks, and make informed financial decisions.</p>";

  pdfContent += activeLoansTable;
  pdfContent +=
    "<h3 style='font-family: Times New Roman; text-transform: uppercase;'>3.2. OVERDUE LOANS</h3>";
  pdfContent +=
    "<p style='text-align: left; font-family: Times New Roman;'>Overdue loans represent amounts that have not been repaid within the agreed loan duration, indicating delays in loan servicing obligations by members. Some of these members may have made communication with the loans committee and were given a grace period. According to our loans policy, instant loans mature in not more than two months while short-term loans mature in a period agreed apon on application and must be between 3-6 months. Timely identification of these loans is critical for initiating recovery measures and maintaining healthy cash flow within the group.</p>";
  pdfContent += overdueLoansTable;
  pdfContent +=
    "<h2 style='font-family: Times New Roman; text-transform: uppercase;'>4. SAVINGS</h2>";
  pdfContent +=
    "<p style='text-align: left; font-family: Times New Roman;'>These are savings collected during " +
    month +
    " " +
    year +
    ", and reflect the financial commitment and participation of members in building their personal capital and supporting the group liquidity. The group expected a minimum of UGX " +
    summaryData["Expected savings"] +
    " to be collected from member savings based on our minimum savings requirement.</p>";
  pdfContent +=
    "<p style='text-align: left; font-family: Times New Roman;'>The total savings collected were UGX " +
    summaryData["Total savings collected"] +
    " and UGX " +
    summaryData["Savings arrears"] +
    " remain in earliers. Members who failed to meet the minimum monthly requirement are to face a penalty of UGX 6000. Below is a table showing a summary of savings collected in " +
    month +
    ".</p>";
  pdfContent += monthLySavingsTable;
  pdfContent +=
    "<h2 style='font-family: Times New Roman; text-transform: uppercase;'>5. GROUP EXPENDITURES</h2>";
  pdfContent +=
    "<p style='text-align: left; font-family: Times New Roman;'>The financial sustainability of the group depends not only on income generation but also on good expenditure management. During the month of " +
    month +
    ", various disbursements were made to support the operations and commitments of the group.</p>";

  pdfContent +=
    "<p style='text-align: left; font-family: Times New Roman;'>These expenditures covered administrative costs, mobilization activities, and other essential activities that ensure the group runs efficiently. Transparent documentation reporting of these costs ensures accountability and ensures members stay informed about how funds are utilized. A total of UGX " +
    summaryData["Total expenses this month"] +
    " was spent this month</p>";

  pdfContent +=
    "<p style='text-align: left; font-family: Times New Roman;'>The table below outlines all financial outflows recorded in this month.</p>";
  pdfContent += monthlyExpensesTable;
  pdfContent +=
    "<h2 style='font-family: Times New Roman; text-transform: uppercase;'>6. CUMULATIVE FINANCIAL SUMMARY</h2>";
  pdfContent +=
    "<p style='text-align: left; font-family: Times New Roman;'>To conclude, the cumulative financial metrics of the group from its inception to the end of " +
    month +
    " reflects total metric financial figures leading to the current bank balance.</p>";

  pdfContent +=
    "<p style='text-align: left; font-family: Times New Roman;'>Since its inception, the group has acccumulated a total of UGX " +
    summaryData["Membership fee"] +
    " From member registration fees, UGX " +
    summaryData["Cummulative savings"] +
    " from member savings, UGX " +
    summaryData["Cumulative interest"] +
    " from interest earnings.</p>";

  pdfContent +=
    "<p style='text-align: left; font-family: Times New Roman;'> In addition the group has incurred a total of UGX " +
    summaryData["Cummulative expenses"] +
    " in expenses. The closing balance in the group account as at the end of " +
    month +
    " stands at <strong>UGX " +
    summaryData["Bank Balance"] +
    "</strong>, representing the available liquidity for the operations and upcoming loan disbursements.</p>";

  pdfContent +=
    "<p style='text-align: center; font-family: Times New Roman; text-transform: uppercase;'><strong>END</strong></p>";
  pdfContent +=
    "<p style='font-family: Times New Roman; text-transform: uppercase;'><strong>Regards: </strong>NEON MANAGEMENT.</p>";

  return { pdfContent, month, year };
};
