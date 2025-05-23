const monthlyDataTale = (sheetName) => {
  const data = getSheetData(sheetName);
  const monthlyData = filterByDateRange(data);
  return createTableHtml(monthlyData);
};

const getLoansTable = (data) => {
  const summarizedData = loansSummary(data); //HAave to first summarize
  return createTableHtml(summarizedData);
};

const getTableDirectly = (sheetName) => {
  const data = getSheetData(sheetName);
  return createTableHtml(data);
};

const getSheetData = (sheetName) => {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  const data = sheet.getDataRange().getDisplayValues();
  return { data, sheet };
};

const formatDate = (date) => {
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();

  return day + "-" + month + "-" + year;
};

const createTableHtml = (data) => {
  let tableHtml = "<table style='width: 100%; font-family: Times New Roman;'>";

  data.forEach((row) => {
    tableHtml += "<tr>";
    row.forEach(function (cell, index) {
      let cellStyle = "padding: 5px; border: 1px solid black;";
      tableHtml += "<td style='" + cellStyle + "'>" + cell + "</td>";
    });
    tableHtml += "</tr>";
  });

  tableHtml += "</table>";

  return tableHtml;
};

const filterByDateRange = (data) => {
  const headers = data[0];

  const endDate = new Date();
  const startDate = new Date(endDate);

  startDate.setMonth(startDate.getMonth() - 1);
  startDate.setDate(startDate.getDate() + 1);

  return [
    headers,
    ...data.slice(1).filter((row) => {
      const issueDate = new Date(row[headers.indexOf("transactionDate")]);
      return issueDate >= startDate && issueDate <= endDate;
    }),
  ];
};

const filterByCurrentMonth = (data) => {
  const headers = data[0];
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  return [
    headers,
    ...data.slice(1).filter((row) => {
      const issueDate = new Date(row[headers.indexOf("transactionDate")]);
      return (
        issueDate.getMonth() === currentMonth &&
        issueDate.getFullYear() === currentYear
      );
    }),
  ];
};

const filterbyStatus = (data, status) => {
  const headers = data[0];
  const statusIndex = headers.indexOf("status");

  return [
    headers,
    ...data
      .slice(1)
      .filter((row) => row[statusIndex].toLowerCase() === status.toLowerCase()),
  ];
};

const loansSummary = (data) => {
  const headers = data[0];
  const requiredColumns = [
    "memberId",
    "amount",
    "transactionDate",
    "loanType",
    "loanBalance",
    "interestPaid",
    "pendingInterest",
  ];
  const requiredIndices = requiredColumns.map((column) =>
    headers.indexOf(column)
  );

  return data.map((row) => requiredIndices.map((index) => row[index]));
};

const countRecords = (data) => data.length - 1;

const sumColumn = (data, columnHeader) => {
  const headers = data[0];
  const columnIndex = headers.indexOf(columnHeader);
  if (columnIndex === -1) {
    throw new Error(`Column '${columnHeader}' not found`);
  }
  return data.slice(1).reduce((sum, row) => {
    const value = row[columnIndex].replace(/,/g, ""); // Remove commas
    return sum + (parseFloat(value) || 0);
  }, 0);
};
