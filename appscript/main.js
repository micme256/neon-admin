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
        // transactionEmail(result);
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
      message: successMsg[requestType] || "Operation successfull",
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
