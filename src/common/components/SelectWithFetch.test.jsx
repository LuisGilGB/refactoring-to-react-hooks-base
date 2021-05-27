import React from "react";
import { render, wait } from "@testing-library/react";
import SelectWithFetch from "./SelectWithFetch";
import { SALES_ENDPOINT } from "../../features/Dashboard/consts";

test("Should render SelectWithFetch", async () => {
  render(<SelectWithFetch url={SALES_ENDPOINT} />);

  // This is needed because of useEffect
  await wait();
});
