import TransactionForm from "../components/TransactionForm";
import { useLocation } from "react-router-dom";

const LoanClearing = () => {
  const location = useLocation();
  const { loanToClear } = location.state || {};
  return (
    <>
      <TransactionForm
        initialTransaction={loanToClear}
        formHeader="CLEAR LOAN"
      />
    </>
  );
};

export default LoanClearing;
