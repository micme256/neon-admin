import { useState, useEffect, useContext, useMemo } from "react";
import useFetchFromSheet from "./useFetchFromSheet";
import { formatDate } from "../components/elements/formaDate";
import { getInputAttributes } from "../components/helper-functions/getInputAttributes";
import { MemberContext } from "../App";

const useTransactionForm = (transactionType) => {
  const intialDetails = {
    transactionType: transactionType,
    transactionId: "",
    memberId: "",
    amount: "",
    transactionDate: formatDate(new Date()),
    loanType: "",
    status: "active",
  };
  const [transaction, setTransaction] = useState(intialDetails);
  const [response, setResponse] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const { loading, addRequest, editRequest, deleteRequest } =
    useFetchFromSheet();
  const { members } = useContext(MemberContext);

  const [editMode, setEditMode] = useState(false);
  const [undoMode, setUndoMode] = useState(false);

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

    return mergedFields;
  }, [members, transactionType]);

  useEffect(() => {
    setPrevAttributes(inputAttributes);
  }, [inputAttributes]);

  const getMemberName = (memberId) => {
    const member = members.find((m) => m.memberId === memberId);
    return member ? member.memberName : "";
  };

  useEffect(() => {
    if (response?.status === "success") {
      setShowFeedback(true);
      setTransaction(response.data);
      if (response?.action === "delete") {
        setUndoMode(true);
      }
    } else {
      console.log(response);
    }
  }, [response]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTransaction((prev) => {
      const newValues = { ...prev, [name]: value };

      // Auto-update memberName when memberId changes
      if (name === "memberId") {
        newValues["memberName"] = getMemberName(value);
      }
      return newValues;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setShowFeedback(false);
      let data;
      if (editMode) {
        data = await editRequest(transaction);
      } else {
        data = await addRequest(transaction);
      }
      setResponse(data);
    } catch (error) {
      setResponse(error);
    }
  };

  const handleClose = () => {
    setTransaction(intialDetails);
    setShowFeedback(false);
    setEditMode(false);
    setUndoMode(false);
  };
  const handleEdit = () => {
    setEditMode(true);
    setShowFeedback(false);
  };

  const handleUndo = async () => {
    try {
      const data = await deleteRequest(transaction);
      setResponse(data);
    } catch (error) {
      setResponse(error);
    }
  };

  return {
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
  };
};

export default useTransactionForm;
