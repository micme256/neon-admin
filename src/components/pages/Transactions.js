import React from "react";
import RecentActivity from "../ui-components/RecentActivity";
import TransactionsForm from "../elements/TransactionsForm";
import { useContext } from "react";
import { MemberContext } from "../../App";

const Transactions = () => {
  const { members } = useContext(MemberContext);

  const recentActivity = [
    {
      transactionId: "LO21-331118",
      memberId: "NEON/015",
      amount: 500000,
      transactionDate:
        "Thu Apr 13 2023 17:00:00 GMT-0400 (Eastern Daylight Time)",
      loanType: "short-term",
      status: "approved",
      pendingInterest: 200,
      lastRepaymentDate:
        "Mon Jan 02 2023 16:00:00 GMT-0500 (Eastern Standard Time)",
    },
    {
      transactionId: "LO19-460819",
      memberId: "NEON/004",
      amount: 300000,
      transactionDate:
        "Sun May 14 2023 17:00:00 GMT-0400 (Eastern Daylight Time)",
      loanType: "long-term",
      status: "closed",
      pendingInterest: 200,
      lastRepaymentDate:
        "Tue Jan 03 2023 16:00:00 GMT-0500 (Eastern Standard Time)",
    },
    {
      transactionId: "LO20-160819",
      memberId: "NEON/005",
      amount: 500000,
      transactionDate:
        "Fri Apr 14 2023 17:00:00 GMT-0400 (Eastern Daylight Time)",
      loanType: "short-term",
      status: "active",
      pendingInterest: 200,
      lastRepaymentDate:
        "Wed Jan 04 2023 16:00:00 GMT-0500 (Eastern Standard Time)",
    },
    {
      transactionId: "LO21-331119",
      memberId: "NEON/001",
      amount: 314297,
      transactionDate:
        "Thu Jun 01 2023 17:00:00 GMT-0400 (Eastern Daylight Time)",
      loanType: "long-term",
      status: "pending",
      pendingInterest: 200,
      lastRepaymentDate:
        "Thu Jan 05 2023 16:00:00 GMT-0500 (Eastern Standard Time)",
    },
  ];
  const inputAttributes = [
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
      value: "",
    },
    {
      type: "select",
      name: "transactionType",
      label: "Transaction type",
      options: ["loans", "savings", "amortisation", "interest", "penalties"],
    },
    {
      type: "select",
      name: "loanType",
      label: "Loan type",
      options: ["short-term", "long-term"], //loan types
    },
  ];
  return (
    <>
      <RecentActivity recentActivity={recentActivity} />
      <TransactionsForm
        inputAttributes={inputAttributes}
        formHeader="NEW TRANSACTION"
      />
    </>
  );
};

export default Transactions;
