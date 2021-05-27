import React, { createContext } from "react";
import useFetch from "../common/hooks/useFetch/useFetch";

export const RemoteContext = createContext();

export const RemoteProvider = ({ url, children }) => {
  const useFetchReturnValues = useFetch({url});

  return <RemoteContext.Provider value={useFetchReturnValues}>{children}</RemoteContext.Provider>;
};
