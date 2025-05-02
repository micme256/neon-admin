import RecentActivity from "../components/RecentActivity";
import TransactionForm from "../components/TransactionForm";
import useFetchData from "../hooks/useFetchData";

const Transactions = () => {
  const {
    data: transactions,
    loading,
    error,
  } = useFetchData({
    dataType: "transactions",
    limit: 20,
  });

  return (
    <>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      {transactions && transactions.length > 0 && (
        <RecentActivity recentActivity={transactions} />
      )}
      <TransactionForm />
    </>
  );
};

export default Transactions;
