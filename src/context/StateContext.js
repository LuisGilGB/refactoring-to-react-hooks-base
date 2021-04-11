import React, { useState } from "react";
import { createContext } from "react";
import useFetch from "../common/hooks/useFetch";

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [url, setUrl] = useState("");
  const { responseData } = useFetch({ url });

  const fetchDataset = (newUrl) => {
    setUrl(newUrl);
  };

  return (
    <StateContext.Provider
      value={{
        salesTotal: 6789,
        subscriptionsTotal: 1234,
        dataset: responseData || [],
        fetchDataset,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
