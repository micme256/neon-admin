import React from "react";
import FormInput from "./FormInput";
import DataFeedback from "../ui-components/DataFeedback";
import useTransactionForm from "../../hooks/useTransactionForm";

const TransactionsForm = ({
  transactionType,
  formHeader = "NEW TRANSACTION",
}) => {
  const {
    formValues,
    response,
    inputAttributes,
    loading,
    error,
    showFeedback,
    handleChange,
    handleSubmit,
    handleClose,
    handleEdit,
    editMode,
    handleUndo,
    undoSuccess,
  } = useTransactionForm(transactionType);

  return (
    <div className="transaction-form">
      <h1>{formHeader}</h1>
      {loading && <p className="loading">Submitting...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!showFeedback && (
        <form onSubmit={handleSubmit}>
          {inputAttributes.map((inputElement) => (
            <FormInput
              key={inputElement.name}
              {...inputElement}
              value={formValues[inputElement.name] || ""}
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
          undoSuccess={undoSuccess}
        />
      )}
    </div>
  );
};

export default TransactionsForm;
