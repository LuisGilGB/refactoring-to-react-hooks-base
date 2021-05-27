import React, { createContext, useEffect, useState } from "react";
import useFetch from "../common/hooks/useFetch/useFetch";
import {
  SALES_ENDPOINT,
  SUBSCRIPTIONS_ENDPOINT,
} from "../features/Dashboard/consts";

const getTotal = (input = []) =>
  (input || []).reduce((acc, { amount }) => acc + amount, 0);

const DEFAULT_DATASET = [];

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [dataset, setDataset] = useState(DEFAULT_DATASET);
  const { responseData: salesData, update: updateSales } = useFetch({
    url: SALES_ENDPOINT,
  });
  const { responseData: subscriptionsData, update: updateSubscriptions } =
    useFetch({
      url: SUBSCRIPTIONS_ENDPOINT,
    });

  useEffect(() => {
    updateSales();
    updateSubscriptions();
  }, [updateSales, updateSubscriptions]);

  const setSelection = (newSelectedValue) => {
    const possibleValues = {
      sales: salesData,
      subscriptions: subscriptionsData,
    };
    setDataset(possibleValues[newSelectedValue] || DEFAULT_DATASET);
  };

  return (
    <StateContext.Provider
      value={{
        salesTotal: getTotal(salesData),
        subscriptionsTotal: getTotal(subscriptionsData),
        dataset,
        setSelection,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
