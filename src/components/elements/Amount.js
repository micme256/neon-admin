import React from "react";
import { formatAmount } from "../helper-functions/formatAmount";

const Amount = ({ amount }) => {
  return (
    <div className="amount">
      <span className="currency-symbol">UGX </span>
      {formatAmount(amount)}
    </div>
  );
};

export default Amount;
