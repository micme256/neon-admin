//Deleting data from the sheets
const deleteData = (formData) => {
  try {
    let { transactionType, transactionId } = formData;
    if (transactionType === "loans") {
      transactionType = "newLoan";
    }
    const { data, sheet } = checkSheetData(transactionType);

    let deleted = false;
    for (let i = 0; i < data.length; i++) {
      if (data[i][0] === transactionId) {
        sheet.getRange(i + 1, 1, 1, sheet.getLastColumn()).clearContent();
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
