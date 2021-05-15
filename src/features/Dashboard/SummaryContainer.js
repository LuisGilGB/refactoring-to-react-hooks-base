import React, { useContext } from "react";
import { StateContext } from "../../context/StateContext";

const SummaryContainer = () => {
  const {salesTotal, subscriptionsTotal} = useContext(StateContext);
  return (
    <div className="summary flex flex-row" data-cy="summary-container">
      <div className="card bg-indigo" data-cy="sales-summary">
        <p>CellFast sales</p>
        <p>$ {salesTotal}</p>
      </div>
      <div className="card bg-blue" data-cy="subscriptions-summary">
        <p>CellNow subscriptions</p>
        <p>$ {subscriptionsTotal}</p>
      </div>
    </div>
  );
};

export default SummaryContainer;
