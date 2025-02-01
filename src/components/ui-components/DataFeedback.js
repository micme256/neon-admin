import React from "react";

const DataFeedback = ({ response, onClose }) => {
  if (!response || response.status !== "success") return null;

  const { message, data: addedData } = response;
  return (
    <div className="success-modal">
      <div className="success-content">
        <h2>✅ Submission Successful!</h2>
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
          <button className="edit-btn" onClick={onClose}>
            ✏️ Edit
          </button>
          <button className="close-btn" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataFeedback;
