import React from "react";

const DataFeedback = ({ response, onClose, onEdit, onUndo, undoMode }) => {
  if (!response || response.status !== "success") {
    return null;
  }

  const { message, data: addedData } = response;
  return (
    <div className="success-modal">
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
            <button className="undo-btn" onClick={onUndo}>
              ⏪ Undo
            </button>
          )}
          {!undoMode && (
            <button className="edit-btn" onClick={onEdit}>
              ✏️ Edit
            </button>
          )}
          <button className="close-btn" onClick={onClose}>
            ✅ OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataFeedback;
