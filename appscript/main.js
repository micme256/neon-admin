function doGet() {
  return HtmlService.createTemplateFromFile("index")
    .evaluate()
    .addMetaTag("viewport", "width=device-width, initial-scale=1.0");
}

//Sending data to sheets
const addData = (formData) => {
  try {
    const { transactionType } = formData;
    const { data, sheet } = checkSheetData(transactionType);

    const keyRow = sheet.getLastRow() + 1;
    const headers = data[0];
    formData.transactionId = generateTransactionId(
      transactionType.slice(0, 3).toUpperCase()
    );
    const addedData = {};
    addedData.memberName = memberName(formData.memberId);
    addedData.transactionType = transactionType;
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
    const succesMsg = {
      status: "success",
      action: "action",
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

//Editing Sheet data
const editData = (formData) => {
  try {
    const { transactionType, transactionId } = formData;
    const { data, sheet } = checkSheetData(transactionType);
    const headers = data[0];
    let updated = false;
    const edittedData = {};
    for (let i = 0; i < data.length; i++) {
      if (data[i][0] === transactionId) {
        const keyRow = i + 1;
        Object.entries(formData).forEach(([key, value]) => {
          const keyColumn = headers.indexOf(key) + 1;
          if (keyColumn) {
            const dataCell = sheet.getRange(keyRow, keyColumn);
            dataCell.setValue(value);
            edittedData[key] = value;
          }
        });
        edittedData.memberName = memberName(formData.memberId);
        edittedData.transactionType = transactionType;
        updated = true;
        break;
      }
    }
    if (!updated) {
      throw new Error(`Transaction ID '${transactionId}' not found`);
    }
    return {
      status: "success",
      action: "edit",
      message: "Data updated successfully",
      data: edittedData,
    };
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

//Deleting data from the sheets
const deleteData = (formData) => {
  try {
    const { transactionType, transactionId, memberId } = formData;
    const { data, sheet } = checkSheetData(transactionType);
    let deleted = false;
    for (let i = 0; i < data.length; i++) {
      if (data[i][0] === transactionId) {
        sheet.deleteRow(i + 1);
        deleted = true;
        break;
      }
    }
    if (!deleted) {
      throw new Error(`Transaction ID '${transactionId}' not found`);
    }
    const deletedData = {
      transactionId,
      memberId,
      memberName: memberName(formData.memberId),
    };
    return {
      status: "success",
      action: "delete",
      message: "Transaction deleted successfully",
      data: deletedData,
    };
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
//Fetching Data from sheets
const fetchData = (formData) => {
  try {
    const { dataType, memberId, transactionType, limit } = formData;
    let dataObject;

    if (dataType === "transactions") {
      dataObject = getTransactionsData(transactionType, memberId, limit);
    } else {
      dataObject = getAccountData(memberId);
    }

    return dataObject;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
// Retrieve transaction Data
const getTransactionsData = (transactionType, memberId, limit) => {
  try {
    const { data } = checkSheetData(transactionType);
    const headers = data.shift();
    let dataObj;
    if (memberId) {
      dataObj = data.filter((row) => row[1] === memberId);
    } else {
      dataObj = data;
    }
    const dateSorted = dataObj.sort((a, b) => {
      return new Date(b[3]) - new Date(a[3]);
    });
    const structuredData = dateSorted.map((row) => {
      const transaction = {};
      headers.forEach((header, index) => {
        transaction[header] = row[index];
      });
      return transaction;
    });
    const requiredData = structuredData.slice(0, limit || 10);
    if (requiredData.length == 0) {
      throw new Error(`No records found`);
    }

    const succesObj = {
      status: "success",
      action: "fetch",
      message: "Data retrieved successfully",
      data: requiredData,
    };
    return JSON.parse(JSON.stringify(succesObj));
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

//Helper function to check sheet and return data
const checkSheetData = (transactionType) => {
  try {
    const sheetName = transactionType;
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

//Helper function to get member name
const memberName = (memberId) => {
  const sheetName = "Database";
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  const data = sheet.getDataRange().getValues();
  for (let i = 0; i < data.length; i++) {
    if (data[i][0] === memberId) {
      return data[i][1];
    }
  }
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

const requestHandlers = {
  addData: addData,
  editData: editData,
  deleteData: deleteData,
  fetchData: fetchData,
};

const checkRequest = (formData, requestType) => {
  const handler = requestHandlers[requestType];
  return handler ? handler(formData) : addData(formData);
};
