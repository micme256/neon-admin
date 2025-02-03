import React from "react";
import FormInput from "./FormInput";
import DataFeedback from "../ui-components/DataFeedback";
import useTransactionForm from "../../hooks/useTransactionForm";

const TransactionsForm = ({
  transactionType,
  formHeader = "NEW TRANSACTION",
}) => {
  const {
    transaction,
    response,
    inputAttributes,
    loading,
    showFeedback,
    handleChange,
    handleSubmit,
    handleClose,
    handleEdit,
    editMode,
    handleUndo,
    undoMode,
  } = useTransactionForm(transactionType);

  return (
    <div className="transaction-form">
      <h1>{formHeader}</h1>
      {loading && <p className="loading">Submitting...</p>}
      {/* {error && <p style={{ color: "red" }}>Error: {response.error}</p>} */}

      {!showFeedback && (
        <form onSubmit={handleSubmit}>
          {inputAttributes.map((inputElement) => (
            <FormInput
              key={inputElement.name}
              {...inputElement}
              value={transaction[inputElement.name] || ""}
              onChange={handleChange}
            />
          ))}
          {!editMode ? (
            <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "ENTER"}
            </button>
          ) : (
            <button type="submit" disabled={loading}>
              {loading ? "Re-submitting..." : "RE-ENTER"}
            </button>
          )}
        </form>
      )}

      {showFeedback && (
        <DataFeedback
          response={response}
          onClose={handleClose}
          onEdit={handleEdit}
          onUndo={handleUndo}
          undoMode={undoMode}
        />
      )}
    </div>
  );
};

export default TransactionsForm;
