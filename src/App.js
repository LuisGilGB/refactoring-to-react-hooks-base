import React, { useState } from "react";
import Fetch from "./common/components/Fetch";
import Select from "./common/components/Select";
// import DashboardShell from "./features/Dashboard/DashboardShell";

// TODO: Delete when restoring DashboardShell
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
  // TODO: Delete everything but DashboardShell return when the time comes.
  const [url, setUrl] = useState("");

  const onSelectChange = ({ target }) =>
    setUrl(target.value ? `/${target.value}/` : "");

  // return <DashboardShell />;
  return (
    <div>
      <Select options={OPTIONS} onChange={onSelectChange} />
      <Fetch url={url}>
        {({ responseData, isFetching }) =>
          isFetching ? (
            <h2>Fetching data...</h2>
          ) : (
            <ul>
              {(responseData || []).map((item, i) => (
                <li key={i}>{JSON.stringify(item)}</li>
              ))}
            </ul>
          )
        }
      </Fetch>
    </div>
  );
};

export default App;
