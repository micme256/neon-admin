import React from "react";
import { useState } from "react";

const FormInput = ({
  type = "text",
  placeholder = "",
  name = "",
  label = "",
  value = "",
  checked = false,
  options = [],
  readOnly = false,
  className = "",
}) => {
  const [inputValue, setInputValue] = useState(
    type === "checkbox" || type === "radio" ? checked : value
  );
  const [isSelected, setIsSelected] = useState(checked);

  const handleChange = (e) => {
    switch (type) {
      case "checkbox":
      case "radio":
        setIsSelected(e.target.checked);
        break;
      case "select":
        setInputValue(e.target.value);
        break;
      default:
        setInputValue(e.target.value);
    }
  };

  if (type === "select") {
    return (
      <label>
        {label}
        <select name={name} value={inputValue} onChange={handleChange} required>
          <option value="" disabled>
            Select option
          </option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    );
  }
  if (readOnly) {
    return (
      <label>
        {label}
        <input
          type={type}
          name={name}
          value={inputValue}
          readOnly={readOnly}
          className={className}
        />
      </label>
    );
  }

  return (
    <label>
      {label}
      <input
        type={type}
        name={name}
        key={name}
        value={type === "checkbox" || type === "radio" ? "" : inputValue}
        checked={type === "checkbox" || type === "radio" ? isSelected : false}
        placeholder={placeholder}
        onChange={handleChange}
        className={className}
      />
    </label>
  );
};

export default FormInput;
