import React from "react";
import SelectWithFetch from "./common/components/SelectWithFetch";
import DashboardShell from "./features/Dashboard/DashboardShell";

const App = () => {
  // return <DashboardShell />;
  return <div>
    <SelectWithFetch url="/sales/" valueKey="timestamp" />
  </div>
};

export default App;
