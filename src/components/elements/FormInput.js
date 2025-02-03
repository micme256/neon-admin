import React from "react";

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
  onChange,
}) => {
  const handleChange = (e) => {
    if (onChange) onChange(e);
  };

  if (type === "select") {
    return (
      <label>
        {label}
        <select name={name} value={value} onChange={handleChange} required>
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

  return (
    <label>
      {label}
      <input
        type={type}
        name={name}
        value={value}
        checked={type === "checkbox" || type === "radio" ? checked : undefined}
        placeholder={placeholder}
        readOnly={readOnly}
        className={className}
        onChange={handleChange}
      />
    </label>
  );
};

export default FormInput;
