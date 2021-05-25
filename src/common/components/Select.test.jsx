import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Select from "./Select";

const THREE_OPTION_SET = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
]

test("Should render Select", () => {
  render(<Select options={[]} />);
});

test("Should render the default option when no options are given", () => {
  const { getByText, getByTestId } = render(<Select options={[]} />);

  expect(getByText("--")).toBeInTheDocument();
  expect(getByTestId("select-default-option")).toBeInTheDocument();
});

test("Should render only one default option when no options are given", () => {
  const { queryAllByTestId } = render(<Select options={[]} />);

  expect(queryAllByTestId("select-default-option")).toHaveLength(1);
});

test("Should render the default option when some options are given", () => {
  const { getByText, getByTestId } = render(<Select options={THREE_OPTION_SET} />);

  expect(getByText("--")).toBeInTheDocument();
  expect(getByTestId("select-default-option")).toBeInTheDocument();
});

test("Should render only one default option when some options are given", () => {
  const { queryAllByTestId } = render(<Select options={THREE_OPTION_SET} />);

  expect(queryAllByTestId("select-default-option")).toHaveLength(1);
});

test("Should render as many non default options as passed", () => {
  const { queryAllByTestId } = render(
    <Select
      options={THREE_OPTION_SET}
    />
  );

  expect(queryAllByTestId("select-option")).toHaveLength(3);
});

test("Should render the options passed with its own labels", () => {
  const { getByText } = render(
    <Select
      options={THREE_OPTION_SET}
    />
  );

  expect(getByText("Option 1")).toBeInTheDocument();
  expect(getByText("Option 2")).toBeInTheDocument();
  expect(getByText("Option 3")).toBeInTheDocument();
});
