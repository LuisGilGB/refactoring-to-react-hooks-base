import React from "react";
import { render } from "@testing-library/react";
import Main from "./Main";

test("Should render Main", () => {
  render(
    <Main>
      <div>Children 1</div>
      <div>Children 2</div>
    </Main>
  );
});
