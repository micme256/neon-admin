import KeyMetrics from "../components/KeyMetrics";
import Contribution from "../components/Contribution";
import { useGeneralData } from "../components/MemberContext";

const Dashboard = () => {
  const { accountsData, metricObj } = useGeneralData();
  const metricsData = metricObj
    ? {
        "Total Savings": metricObj["Total Savings"],
        "Membership fee": metricObj["Membership fee"],
        "Cumulative expenses": metricObj["Cumulative expenses"],
        "Bank Balance": metricObj["Bank Balance"],
      }
    : {};
  return (
    <>
      <KeyMetrics metricsData={metricsData} />
      <Contribution contributions={[...accountsData]} />
    </>
  );
};

export default Dashboard;
