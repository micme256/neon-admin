import { Routes, Route, useLocation } from "react-router-dom";
import Nav from "./pages/Nav";
import Dashboard from "./pages/Dashboard";
import Loans from "./pages/Loans";
import Transactions from "./pages/Transactions";
import DataFeedback from "./components/DataFeedback";
import LoanClearing from "./pages/LoanCearing";
import TransEditing from "./pages/TransEditing";
import { MemberProvider } from "./components/MemberContext";

function App() {
  const location = useLocation();

  return (
    <MemberProvider>
      {location.pathname !== "/data-feedback" && <Nav />}
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="loan" element={<Loans />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="data-feedback" element={<DataFeedback />} />
        <Route path="loan-clearing" element={<LoanClearing />} />
        <Route path="trans-edit" element={<TransEditing />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </MemberProvider>
  );
}

export default App;
