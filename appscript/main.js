function doGet() {
  return HtmlService.createTemplateFromFile("index")
    .evaluate()
    .addMetaTag("viewport", "width=device-width, initial-scale=1.0");
}

const checkRequestType = (formData, requestType) => {
  try {
    let memberName;
    if (formData.memberId) {
      //Check if member exists in database and return Name
      const members = namesMapedById();
      memberName = members.get(formData.memberId);
      if (!memberName) {
        throw new Error(`Member with ID '${formData.memberId}' not found`);
      }
    }

    let result;
    switch (requestType) {
      case "addData":
        result = addData(formData);
        break;
      case "editData":
        result = editData(formData);
        break;
      case "deleteData":
        result = deleteData(formData);
        break;
      case "fetchData":
        result = fetchData(formData);
        break;
      default:
        throw new Error(`Invalid request type: ${requestType}`);
    }
    if (result instanceof Error) {
      throw result;
    }
    if (requestType !== "fetchData") {
      result.memberName = memberName;
    }
    const successMsg = {
      addData: "Data added successfully",
      editData: "Data edited successfully",
      deleteData: "Transaction deleted successfully",
      fetchData: "Data retrieved successfully",
    };
    const response = {
      status: "success",
      action: requestType,
      message: successMsg[requestType],
      data: result,
    };

    return JSON.parse(JSON.stringify(response));
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

/*Data sheets are nemed according to transaction types they store */

//Sending data to sheets
const addData = (formData) => {
  try {
    const { transactionType } = formData;
    const { data, sheet } = checkSheetData(transactionType);
    const headers = data[0];

    const rowIndex = sheet.getLastRow() + 1;

    formData.transactionId = generateTransactionId(
      transactionType.slice(0, 3).toUpperCase()
    );

    const addedData = {}; //Response data on success

    Object.entries(formData).forEach(([key, value]) => {
      const colIndex = headers.indexOf(key) + 1;
      if (colIndex) {
        const dataCell = sheet.getRange(rowIndex, colIndex);
        dataCell.setValue(value);
        addedData[key] = value;
      }
    });
    addedData.transactionType = transactionType;

    return addedData;
  } catch (error) {
    return error;
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
        const rowIndex = i + 1;
        Object.entries(formData).forEach(([key, value]) => {
          const colIndex = headers.indexOf(key) + 1;
          if (colIndex) {
            const dataCell = sheet.getRange(rowIndex, colIndex);
            dataCell.setValue(value);
            edittedData[key] = value;
          }
        });

        edittedData.transactionType = transactionType;

        updated = true;
        break;
      }
    }
    if (!updated) {
      throw new Error(`Transaction ID '${transactionId}' not found`);
    }
    return edittedData;
  } catch (error) {
    return error;
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

    return { transactionId };
  } catch (error) {
    return error;
  }
};

//Fetching Data from sheets
const fetchData = (formData) => {
  try {
    const { dataType, transactionType, limit } = formData;
    const members = namesMapedById();

    if (dataType === "transactions") {
      let recentTransactions = {};
      const requiredTransactions = [transactionType] || [
        "loans",
        "shares",
        "savings",
        "penalties",
        "interest",
        "loanRepay",
        "expenditures",
      ];
      for (const transactionType of requiredTransactions) {
        const transactionData = getTypeData(transactionType, limit, members);

        if (transactionData instanceof Error) {
          throw transactionData;
        }

        transactionData.forEach((record) => {
          record.transactionType = transactionType;
        });
        recentTransactions.push(...transactionData);
      }

      recentTransactions.sort((a, b) => {
        new Date(b.transactionDate) - new Date(a.transactionDate);
      });

      const requiredNumb = recentTransactions.slice(0, limit);

      if (requiredNumb.length === 0) {
        throw new Error("No records found");
      }
      return requiredNumb;
    } else {
      return generalData(formData);
    }
  } catch (error) {
    return error;
  }
};
// Retrieve transaction Data
const getTypeData = (transactionType, limit, members) => {
  try {
    const { data } = checkSheetData(transactionType);
    const headers = data.shift();

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

    return requiredData;
  } catch (error) {
    return error;
  }
};

const getGeneralData = () => {
  try {
    const { data: metricsData } = checkSheetData("metrics");
    const { data: accountsData } = checkSheetData("accounts");

    const [metricKeys, metricValues] = metricsData;
    const metricObj = {};
    metricKeys.forEach((key, index) => {
      metricObj[key] = metricValues[index];
    });

    return { accountsData, metricObj };
  } catch (error) {
    return error;
  }
};
