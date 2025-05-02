import React, { useState } from "react";
import FormInput from "./FormInput";
import useFormActions from "../../hooks/useFormActions";

const Form = ({
  formHeader = "NEW TRANSACTION",
  handleChange,
  inputAttributes,
  formData,
  isEditing,
}) => {
  const { loading, submitForm, processLoanFormData } = useFormActions();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = formData;
    if (data.transactionType === "loanRepay") {
      data = processLoanFormData(formData);
    }
    submitForm(data, isEditing);
  };

  return (
    <div className="transaction-form">
      <h1>{formHeader}</h1>
      {loading && <p className="loading">Submitting...</p>}

      <form onSubmit={handleSubmit}>
        {inputAttributes.map((inputElement) => (
          <FormInput
            key={inputElement.label}
            name={inputElement.name || inputElement.label}
            {...inputElement}
            value={
              formData[inputElement.name] || formData[inputElement.label] || ""
            }
            onChange={handleChange}
          />
        ))}
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : isEditing ? "Update" : "Enter"}
        </button>
      </form>
    </div>
  );
};

export default Form;
