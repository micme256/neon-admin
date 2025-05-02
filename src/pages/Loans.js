import React from "react";
import RecentActivity from "../components/RecentActivity";
import KeyMetrics from "../components/KeyMetrics";
import useFetchData from "../hooks/useFetchData";
import { useGeneralData } from "../components/MemberContext";

const Loans = () => {
  const {
    data: transactions,
    loading,
    error,
  } = useFetchData({
    dataType: "transactions",
    transactionType: "loans",
    limit: 60,
  });
  const { metricObj } = useGeneralData();
  const metricsData = metricObj
    ? {
        "Active Loans": `${metricObj["Active Loans"]}`,
        "Loan Sum": metricObj["Loan Sum"],
      }
    : {};

  if (loading) {
    return (
      <>
        <KeyMetrics metricsData={metricsData} />
        <p className="loading">Loading...</p>
      </>
    );
  }

  if (error) {
    return (
      <>
        <KeyMetrics metricsData={metricsData} />
        <p className="error">Error: {error}</p>
      </>
    );
  }

  return (
    <>
      <KeyMetrics metricsData={metricsData} />
      {transactions && transactions.length > 0 ? (
        <RecentActivity recentActivity={transactions} />
      ) : (
        <p>No loan transactions found.</p>
      )}
    </>
  );
};

export default Loans;
