import React, { createContext, useContext, useEffect, useState } from "react";
import useFetchData from "../hooks/useFetchData";

const MemberContext = createContext({
  accountsData: null,
  metricObj: null,
});

export const useGeneralData = () => {
  return useContext(MemberContext);
};

export const MemberProvider = ({ children }) => {
  const {
    data: generalData,
    loading,
    error,
  } = useFetchData({
    dataType: "generalData",
  });

  const { accountsData, metricObj } = generalData || {};

  if (loading) {
    return <div className="loading-screen">Loading data...</div>;
  }

  if (error) {
    return (
      <div className="loading-screen error">
        Error loading data: {error.message || "Unknown error"}
      </div>
    );
  }

  if (!accountsData) {
    return (
      <div className="loading-screen error">Failed to load accounts data.</div>
    );
  }

  return (
    <MemberContext.Provider value={{ accountsData, metricObj }}>
      {children}
    </MemberContext.Provider>
  );
};
