//Fetching Data from sheets
const fetchData = (formData) => {
  try {
    const { dataType, transactionType, limit } = formData;
    const members = namesMapedById();

    if (dataType === "transactions") {
      let recentTransactions = [];
      const requiredTransactions = transactionType
        ? [transactionType]
        : [
            "loans",
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

      recentTransactions.sort(
        (a, b) => new Date(b.transactionDate) - new Date(a.transactionDate)
      );

      const requiredNumb = recentTransactions.slice(0, limit);

      if (requiredNumb.length === 0) {
        throw new Error("No records found");
      }
      return requiredNumb;
    } else {
      return getGeneralData();
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

    const dateSorted = data.sort((a, b) => {
      return new Date(b[3]) - new Date(a[3]);
    });

    const structuredData = dateSorted.map((row) => {
      const transaction = {};
      headers.forEach((header, index) => {
        transaction[header] = row[index];
      });

      transaction.memberName = members.get(transaction.memberId) || "Unknown";

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
