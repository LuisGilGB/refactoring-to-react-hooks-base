import React, { useContext, useState } from "react";
import Aside from "../../common/components/Aside";
import ChartContainer from "./ChartContainer";
import Layout from "../../common/components/Layout";
import Main from "../../common/components/Main";
import SummaryContainer from "./SummaryContainer";
import Select from "../../common/components/Select";
import { StateContext } from "../../context/StateContext";
import { OPTIONS_FOR_SELECT } from "./consts";

const DashboardShell = () => {
  const [selectedLabel, setSelectedLabel] = useState("");
  const { fetchDataset } = useContext(StateContext);

  const handleSelectChange = (event) => {
    const selectedSet = event.target.value;
    const selectedLabel = event.target.selectedOptions[0].label;
    const setEndpoint = `${process.env.REACT_APP_BASE_URL}/${selectedSet}/`;
    fetchDataset(setEndpoint);
    setSelectedLabel(selectedLabel);
  };

  const buildSelect = () => (
    <>
      <label htmlFor="select-product">Please select a chart:</label>
      <div className="field">
        <Select options={OPTIONS_FOR_SELECT} onChange={handleSelectChange} />
        <div className="chevron-wrapper flex">
          <svg
            className="chevron"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </>
  );

  return (
    <Layout>
      <Aside>
        <h2># Polly dashboard</h2>
        {buildSelect()}
      </Aside>
      <Main>
        <h1>
          Welcome, <span className="bold">learner!</span>
        </h1>
        <SummaryContainer />
        <ChartContainer selectedLabel={selectedLabel} />
      </Main>
    </Layout>
  );
};

export default DashboardShell;
