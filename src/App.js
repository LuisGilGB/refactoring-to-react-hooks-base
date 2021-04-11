import React, { useState } from "react";
import Fetch from "./common/components/Fetch";
import { StateProvider } from "./context/StateContext";
import DashboardShell from "./features/Dashboard/DashboardShell";

const App = () => {
  // TODO: Delete everything but DashboardShell return when the time comes.
  const [url, setUrl] = useState("");

  const onSelectChange = ({ target }) =>
    setUrl(
      target.value ? `${process.env.REACT_APP_BASE_URL}/${target.value}/` : ""
    );

  return (
    <StateProvider>
      <DashboardShell />
      <div>
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
    </StateProvider>
  );
};

export default App;
