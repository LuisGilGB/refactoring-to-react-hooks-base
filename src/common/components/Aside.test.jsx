import React from "react";
import { render } from "@testing-library/react";
import Aside from "./Aside";

test("Should render Aside", () => {
  render(
    <Aside>
      <div>Children 1</div>
      <div>Children 2</div>
    </Aside>
  );
});
