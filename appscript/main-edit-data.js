//Editing Sheet data
const editData = (formData) => {
  formData.transactionDate = convertToDate(formData.transactionDate);

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
