import { getTransactionFields } from "./helper-functions/getTransactionFields";
import { useEffect, useState } from "react";
import Form from "./elements/Form";
import { getMemberName } from "./helper-functions/getMemberName";
import { memberObjectsFromArrays } from "./helper-functions/memberObjectsFromArrays";
import { useGeneralData } from "./MemberContext";

const TransactionForm = ({
  initialTransaction = {},
  formHeader = "NEW TRANSACTION",
}) => {
  //USER IS EDITTING IF THE INITUAL TRANSACTION HAS ID AND ITS NOT A LOAN REPAY
  const isEditing =
    initialTransaction.transactionType !== "loanRepay" &&
    !!initialTransaction.transactionId;

  const [formData, setFormData] = useState(
    isEditing || initialTransaction.transactionType === "loanRepay"
      ? { ...initialTransaction }
      : {
          transactionType: initialTransaction.transactionType,
          transactionId: "",
          memberId: "",
          amount: "",
          transactionDate: new Date().toISOString().split("T")[0],
          loanType: "",
        }
  );
  const { accountsData } = useGeneralData();
  const members = memberObjectsFromArrays([...accountsData]);

  const defautInputAttributes = getTransactionFields(
    members,
    initialTransaction.transactionType
  );

  const [inputAttributes, setInputAttributes] = useState(defautInputAttributes);

  useEffect(() => {
    const newFields = getTransactionFields(members, formData.transactionType);
    const mergedFields = [...defautInputAttributes];
    if (
      formData.transactionType === "expenditures" ||
      formData.transactionType === "loanRepay"
    ) {
      setInputAttributes(newFields);
      return;
    }
    newFields.forEach((newField) => {
      if (
        !mergedFields.some(
          (existingField) => existingField.name === newField.name
        )
      ) {
        mergedFields.push(newField);
      }
    });
    setInputAttributes(mergedFields);
  }, [formData.transactionType]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const newValues = { ...prev, [name]: value };

      // Auto-update memberName when memberId changes
      if (name === "memberId") {
        newValues["memberName"] = getMemberName(value, members);
      }
      return newValues;
    });
  };
  return (
    <Form
      formHeader={formHeader}
      inputAttributes={inputAttributes}
      handleChange={handleChange}
      formData={formData}
      isEditing={isEditing}
    />
  );
};

export default TransactionForm;
