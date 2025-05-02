import React from "react";
import useFormActions from "../hooks/useFormActions";
import { useLocation, useNavigate } from "react-router-dom";

const DataFeedback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { loading, deleteTransaction, loadEditor } = useFormActions();

  const { response, undoMode } = location.state || {};

  if (!response || response.status !== "success") {
    console.log(response);
    return null;
  }

  const { message, data: addedData } = response;
  return (
    <div className="success-modal">
      {loading && <p className="loading">loading...</p>}
      <div className="success-content">
        <h2>
          {undoMode ? "⏪ Transaction Deleted!" : "✅ Submission Successful!"}
        </h2>
        <p>{message}</p>
        <table>
          <tbody>
            {Object.entries(addedData).map(([key, value]) => (
              <tr key={key}>
                <td className="key">
                  {key.replace(/([a-z])([A-Z])/g, "$1 $2")}
                </td>
                <td className="value">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="button-group">
          {!undoMode && (
            <button
              className="undo-btn"
              onClick={() => deleteTransaction(addedData)}
            >
              ⏪ Undo
            </button>
          )}
          {!undoMode && (
            <button className="edit-btn" onClick={() => loadEditor(addedData)}>
              ✏️ Edit
            </button>
          )}
          <button onClick={() => navigate("/")}>✅ OK</button>
        </div>
      </div>
    </div>
  );
};

export default DataFeedback;
