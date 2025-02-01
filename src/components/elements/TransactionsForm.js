import React from "react";
import FormInput from "./FormInput";
import useFetchFromSheet from "../../hooks/useFetchFromSheet";
import { formatDate } from "./formaDate";
import DataFeedback from "../ui-components/DataFeedback";
import { useEffect, useState } from "react";

const TransactionsForm = ({
  inputAttributes,
  formHeader = "NEW TRANSACTION",
}) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const { loading, response, error, sendRequest } = useFetchFromSheet();
  useEffect(() => {
    if (response && response.status === "success") {
      setShowFeedback(true);
    }
    console.log(response);
  }, [response]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowFeedback(false);
    const rowData = new FormData(e.target);
    const transactionDate = formatDate(new Date());
    rowData.append("transactionDate", transactionDate);
    const formData = Object.fromEntries(rowData.entries());

    sendRequest(formData);
  };
  // const handleEdit = () => {
  //   setShowFeedback(false);
  // };
  return (
    <div className="transaction-form">
      <h1>{formHeader}</h1>
      {loading && <p className="loading">Submitting...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!showFeedback && (
        <form onSubmit={handleSubmit}>
          {inputAttributes.map((inputElement) => (
            <FormInput key={inputElement.name} {...inputElement} />
          ))}
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "ENTER"}
          </button>
        </form>
      )}
      {showFeedback && (
        <DataFeedback
          response={response}
          onClose={() => setShowFeedback(false)}
          // onEdit={handleEdit}
        />
      )}
    </div>
  );
};

export default TransactionsForm;
