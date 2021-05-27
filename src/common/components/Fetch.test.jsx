import React from "react";
import { render, wait } from "@testing-library/react";
import Fetch from "./Fetch";
import { SALES_ENDPOINT } from "../../features/Dashboard/consts";

test("Should render Fetch", async () => {
  const children = jest.fn(() => <div>Children</div>);

  render(<Fetch url={SALES_ENDPOINT} children={children} />);

  // This is needed because of useEffect
  await wait();
});
