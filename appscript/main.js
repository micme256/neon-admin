function doGet() {
  return HtmlService.createTemplateFromFile("index")
    .evaluate()
    .addMetaTag("viewport", "width=device-width, initial-scale=1.0");
}
const addData = (formData) => {
  try {
    const { transactionType } = formData;
    const sheetName = transactionType;
    const sheet =
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    if (!sheet) {
      throw new Error(`Transaction type '${sheetName}' not found`);
    }
    const dataRange = sheet.getDataRange().getValues();
    const keyRow = sheet.getLastRow() + 1;
    const headers = dataRange[0];
    formData.transactionId = generateTransactionId(
      transactionType.slice(0, 3).toUpperCase()
    );
    const addedData = {};
    addedData.memberName = memberName(formData.memberId);
    if (!addedData.memberName) {
      throw new Error(`Member with ID '${formData.memberId}' not found`);
    }

    Object.entries(formData).forEach(([key, value]) => {
      const keyColumn = headers.indexOf(key) + 1;
      if (keyColumn) {
        const dataCell = sheet.getRange(keyRow, keyColumn);
        dataCell.setValue(value);
        addedData[key] = value;
      }
    });
    addedData.memberName = memberName(formData.memberId);
    const succesMsg = {
      status: "success",
      message: "Data added successfully",
      data: addedData,
    };
    return succesMsg;
  } catch (error) {
    const errorMsg = {
      status: "error",
      message: error.message,
    };
    return errorMsg;
  }
};

//Helper function to get member name
function memberName(memberId) {
  const sheetName = "Database";
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  const data = sheet.getDataRange().getValues();
  for (let i = 0; i < data.length; i++) {
    if (data[i][0] === memberId) {
      return data[i][1];
    }
  }
}

//Helper function to generate transaction IDs
function generateTransactionId(prefix) {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const randomPart = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `${prefix}${year}${month}${day}-${randomPart}`;
}
