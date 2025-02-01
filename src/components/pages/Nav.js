import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" end>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/loan" end>
            Loan
          </NavLink>
        </li>
        <li>
          <NavLink to="transactions" end>
            Transactions
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
