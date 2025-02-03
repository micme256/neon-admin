export const getInputAttributes = (members, transactionType = "default") => {
  const commonFields = [
    {
      type: "select",
      name: "memberId",
      label: "Member ID",
      options: members.map((member) => member.memberId),
    },
    {
      type: "text",
      name: "memberName",
      readOnly: true,
      label: "Name",
    },
    {
      type: "number",
      name: "amount",
      label: "Amount",
    },
  ];

  const transactionSpecificFields = {
    loans: [
      {
        type: "select",
        name: "loanType",
        label: "Loan Type",
        options: ["short-term", "long-term"],
      },
    ],
    savings: [],
    amortisation: [],
    interest: [],
    penalties: [],
    default: [
      {
        type: "select",
        name: "transactionType",
        label: "Transaction Type",
        options: ["loans", "savings", "amortisation", "interest", "penalties"],
      },
    ],
  };

  return [
    ...commonFields,
    ...(transactionSpecificFields[transactionType] ||
      transactionSpecificFields.default),
  ];
};
