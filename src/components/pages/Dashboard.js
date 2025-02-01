import React from "react";
import KeyMetrics from "../ui-components/KeyMetrics";
import Contribution from "../ui-components/Contribution";
import TransactionsForm from "../elements/TransactionsForm";

const Dashboard = () => {
  const contributions = [
    //DUMMY CONTENT
    ["Member ID", "Name", "Savings", "Current Month"],
    ["NEON/001", "TESIGA", 830000, "-"],
    ["NEON/002", "ISHUTI MUGAGGA", 840000, "-"],
    ["NEON/003", "NKURUNZIZA", 830000, "-"],
    ["NEON/004", "KASENGE", 830000, "-"],
    ["NEON/005", "NSHIMYE", 830000, "-"],
    ["NEON/006", "KYAGERA", 830000, "-"],
    ["NEON/007", "BUNJO", 830000, "-"],
    ["NEON/008", "KIBERU", 790000, "-"],
    ["NEON/009", "NDAYAMBAZE", 920000, "CLEARED"],
    ["NEON/010", "KAYIIRA", 790000, "-"],
    ["NEON/011", "RAYMOND", 770000, "-"],
    ["NEON/012", "SSEMIRIMU", 600000, "-"],
    ["NEON/014", "WASSAJJA", 360000, "-"],
    ["NEON/015", "KISUBI", 680000, "-"],
    ["NEON/016", "SEMAYENGO", 820000, "-"],
    ["NEON/017", "SEBAGALA", 370000, "-"],
  ];
  const inputAttributes = [
    {
      type: "select",
      label: "Member ID",
      name: "member-id",
      options: contributions.slice(1).map((Contribution) => Contribution[0]),
      value: "",
    },
    {
      type: "number",
      label: "Amount",
      name: "amount",
    },
  ];
  return (
    <>
      <KeyMetrics />
      <Contribution contributions={contributions} />
      <TransactionsForm
        inputAttributes={inputAttributes}
        formHeader="NEW CONTRIBUTION"
      />
    </>
  );
};

export default Dashboard;
