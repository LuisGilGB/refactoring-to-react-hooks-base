import React from "react";
import { StateProvider } from "./context/StateContext";
import DashboardShell from "./features/Dashboard/DashboardShell";

const App = () => {
  return (
    <StateProvider>
      <DashboardShell />
    </StateProvider>
  );
};

export default App;
