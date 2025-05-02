//Helper function to check sheet and return data
const checkSheetData = (sheetName) => {
  try {
    const sheet =
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    if (!sheet) {
      throw new Error(`Transaction '${sheetName}' not found`);
    }
    const data = sheet.getDataRange().getValues();
    return { data, sheet };
  } catch (error) {
    return error;
  }
};

const namesMapedById = () => {
  const sheetName = "Database";
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

  const data = sheet.getDataRange().getValues();
  const headers = data[0];

  const memberIdIndex = headers.indexOf("No/ID");
  const memberNameIndex = headers.indexOf("first Name");

  const memberMap = new Map();

  for (let i = 0; i < data.length; i++) {
    const memberId = data[i][memberIdIndex];
    const memberName = data[i][memberNameIndex];
    memberMap.set(memberId, memberName);
  }

  return memberMap;
};

//Helper function to generate transaction IDs
const generateTransactionId = (prefix) => {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const randomPart = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `${prefix}${year}${month}${day}-${randomPart}`;
};

//Convert stringfied dates to date
const convertToDate = (input) => {
  if (input instanceof Date) return input; // Already valid
  if (typeof input !== "string") return null;

  const parts = input.split("/");
  if (parts.length !== 3) return null;

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);

  const date = new Date(year, month, day);
  return isNaN(date.getTime()) ? null : date;
};
