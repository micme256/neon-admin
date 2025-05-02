export function getTransactionFields(members, transactionType = "default") {
  const commonFields = [
    {
      type: "select",
      name: "memberId",
      label: "Member ID",
      options: members.map((member) => member["Member ID"]),
    },
    { type: "text", name: "memberName", label: "Name", readOnly: true },
    { type: "number", name: "amount", label: "Amount" },
    { type: "date", name: "transactionDate", label: "Date" },
  ];

  const fieldsByType = {
    newLoan: [
      {
        type: "select",
        name: "transactionType",
        label: "Transaction Type",
        options: ["savings", "penalties", "expenditures", "newLoan"],
      },
      {
        type: "select",
        name: "loanType",
        label: "Loan Type",
        options: ["short-term", "instant-loan"],
      },
      { type: "number", name: "duration", label: "Duration" },
    ],
    savings: [],
    interest: [],
    penalties: [],
    expenditures: [
      {
        type: "select",
        name: "transactionType",
        label: "Transaction Type",
        options: ["savings", "penalties", "expenditures", "newLoan"],
      },
      { type: "text", name: "item", label: "Item" },
      { type: "number", name: "unitPrice", label: "Unit Price" },
      { type: "number", name: "amount", label: "Amount" },
      { type: "date", name: "transactionDate", label: "Date" },
    ],
    loanRepay: [
      {
        type: "text",
        name: "transactionType",
        label: "Transaction Type",
        readOnly: true,
      },
      { type: "text", name: "memberId", label: "Member ID", readOnly: true },
      { type: "text", name: "memberName", label: "Name", readOnly: true },
      { type: "number", name: "amount", label: "Amount due", readOnly: true },
      {
        type: "number",
        name: "pendingInterest",
        label: "Pending Interest",
        readOnly: true,
      },
      { type: "number", name: "amountPaid", label: "Amount paid" },
      { type: "date", name: "transactionDate", label: "Date" },
    ],
    default: [
      {
        type: "select",
        name: "transactionType",
        label: "Transaction Type",
        options: ["savings", "penalties", "expenditures", "newLoan"],
      },
    ],
  };

  const specificFields = fieldsByType[transactionType] || fieldsByType.default;
  const onlySpecific = ["expenditures", "loanRepay"].includes(transactionType);

  return onlySpecific ? specificFields : [...specificFields, ...commonFields];
}
