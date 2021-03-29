import React, { useState } from "react";
import Select from "./common/components/Select";
// import DashboardShell from "./features/Dashboard/DashboardShell";

const OPTIONS = [
  {
    value: "sales",
    label: "Sales",
  },
  {
    value: "subscriptions",
    label: "Subscriptions",
  },
];

const App = () => {
  const [url, setUrl] = useState("");

  const onSelectChange = ({ target }) =>
    setUrl(target.value ? `/${target.value}/` : "");

  // return <DashboardShell />;
  return (
    <div>
      <Select options={OPTIONS} onChange={onSelectChange} />
    </div>
  );
};

export default App;
