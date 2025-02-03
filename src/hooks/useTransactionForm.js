import { useState, useEffect, useContext, useMemo } from "react";
import useFetchFromSheet from "./useFetchFromSheet";
import { formatDate } from "../components/elements/formaDate";
import { getInputAttributes } from "../components/helper-functions/getInputAttributes";
import { MemberContext } from "../App";

const useTransactionForm = (componentTransactionType) => {
  const [formValues, setFormValues] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const { loading, response, error, sendRequest } = useFetchFromSheet();
  const { members } = useContext(MemberContext);

  const [editMode, setEditMode] = useState(false);
  const [undoSuccess, setUndoSuccess] = useState(false);

  const [transactionType, setTransactionType] = useState(
    componentTransactionType
  );

  const [prevAttributes, setPrevAttributes] = useState([]);

  const inputAttributes = useMemo(() => {
    const newFields = getInputAttributes(members, transactionType);

    const mergedFields = [...prevAttributes];

    newFields.forEach((newField) => {
      if (
        !mergedFields.some(
          (existingField) => existingField.name === newField.name
        )
      ) {
        mergedFields.push(newField);
      }
    });

    setPrevAttributes(mergedFields);
    return mergedFields;
  }, [members, transactionType]);

  const getMemberName = (memberId) => {
    const member = members.find((m) => m.memberId === memberId);
    return member ? member.memberName : "";
  };

  useEffect(() => {
    if (response?.status === "success") {
      setShowFeedback(true);
      setFormValues(response.data);
      if (response?.action === "delete") {
        setUndoSuccess(true);
      }
    } else {
      console.log(response);
    }
  }, [response]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => {
      const newValues = { ...prev, [name]: value };

      // Auto-update memberName when memberId changes
      if (name === "memberId") {
        newValues["memberName"] = getMemberName(value);
      }

      // Track transactionType changes and clear loanType if necessary
      if (name === "transactionType") {
        setTransactionType(value);
        newValues["loanType"] = ""; // Reset loanType if transactionType changes
      }

      return newValues;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowFeedback(false);
    let requestType = "addData";

    const rowFormData = new FormData(e.target);

    if (editMode) {
      rowFormData.append("transactionId", formValues.transactionId);
      requestType = "editData";
    }

    if (!rowFormData.has("transactionType")) {
      rowFormData.append("transactionType", transactionType);
    }

    rowFormData.append("transactionDate", formatDate(new Date()));
    const formData = Object.fromEntries(rowFormData.entries());

    sendRequest(formData, requestType);
  };

  //Restore everything to initual state
  const handleClose = () => {
    setFormValues({});
    setShowFeedback(false);
    setTransactionType(componentTransactionType);
    setEditMode(false);
    setUndoSuccess(false);
  };
  const handleEdit = () => {
    setEditMode(true);
    setShowFeedback(false);
    // setDataTobeEdited(response.data);
  };

  const handleUndo = () => {
    const formData = formValues;
    setShowFeedback(false);
    sendRequest(formData, "deleteData");
  };

  return {
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
  };
};

export default useTransactionForm;
