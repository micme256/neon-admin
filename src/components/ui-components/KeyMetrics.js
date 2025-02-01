import React from "react";
import Amount from "../elements/Amount";

const KeyMetrics = () => {
  const keyMetrics = {
    "Total savings": 300000,
    "Total savings in arreas": 50000,
    "Current month Savings": 400000,
    "Outstanding loans sum": 680000,
    "Cummulative Interest Earnings": 656000,
  };
  return (
    <section className="key-metrics">
      {Object.entries(keyMetrics).map(([key, value]) => {
        if (value) {
          return (
            <div className="data-item" key={key}>
              <h3 className={key}>{key}</h3>
              {typeof value === "number" ? (
                <Amount amount={value} />
              ) : (
                <p>{value}</p>
              )}
            </div>
          );
        } else {
          return null;
        }
      })}
    </section>
  );
};

export default KeyMetrics;
