import React, { useContext } from "react";
import PropTypes from "prop-types";
import { StateContext } from "../../context/StateContext";

const SummaryContainer = () => {
  const {salesTotal, subscriptionsTotal} = useContext(StateContext);
  return (
    <div className="summary flex flex-row">
      <div className="card bg-indigo">
        <p>CellFast sales</p>
        <p>$ {salesTotal}</p>
      </div>
      <div className="card bg-blue">
        <p>CellNow subscriptions</p>
        <p>$ {subscriptionsTotal}</p>
      </div>
    </div>
  );
};

SummaryContainer.propTypes = {
  salesTotal: PropTypes.number.isRequired,
  subscriptionsTotal: PropTypes.number.isRequired
};

export default SummaryContainer;
