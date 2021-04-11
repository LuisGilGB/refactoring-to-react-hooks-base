import React from "react";
import { createContext } from "react";

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const fetchDataset = (...params) => {
    console.log(params);
  }

  return (
    <StateContext.Provider
      value={{
        salesTotal: [],
        subscriptionsTotal: [],
        dataset: [],
        fetchDataset,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
