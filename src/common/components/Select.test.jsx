import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Select from "./Select";

const THREE_OPTIONS_SET = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
];

const FOUR_OPTIONS_WITH_CUSTOM_KEYS_SET = [
  { value: "1", option: "option-a", text: "Option a" },
  { value: "2", option: "option-b", text: "Option b" },
  { value: "3", option: "option-c", text: "Option c" },
  { value: "4", option: "option-d", text: "Option d" },
];

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
  const { getByText, getByTestId } = render(
    <Select options={THREE_OPTIONS_SET} />
  );

  expect(getByText("--")).toBeInTheDocument();
  expect(getByTestId("select-default-option")).toBeInTheDocument();
});

test("Should render only one default option when some options are given", () => {
  const { queryAllByTestId } = render(<Select options={THREE_OPTIONS_SET} />);

  expect(queryAllByTestId("select-default-option")).toHaveLength(1);
});

test("Should render as many non default options as passed", () => {
  const { queryAllByTestId } = render(<Select options={THREE_OPTIONS_SET} />);

  expect(queryAllByTestId("select-option")).toHaveLength(3);
});

test("Should render the options passed with its own labels", () => {
  const { getByText } = render(<Select options={THREE_OPTIONS_SET} />);

  expect(getByText("Option 1")).toBeInTheDocument();
  expect(getByText("Option 2")).toBeInTheDocument();
  expect(getByText("Option 3")).toBeInTheDocument();
});

test("Should render the options passed with its own labels defined as a custom label key", () => {
  const { getByText } = render(
    <Select options={FOUR_OPTIONS_WITH_CUSTOM_KEYS_SET} labelKey="text" />
  );

  expect(getByText("Option a")).toBeInTheDocument();
  expect(getByText("Option b")).toBeInTheDocument();
  expect(getByText("Option c")).toBeInTheDocument();
  expect(getByText("Option d")).toBeInTheDocument();
});

test("Should call the onChange function provided as a prop after clicking an option", async () => {
  const onChangeFn = jest.fn();
  const { getByTestId } = render(
    <Select options={THREE_OPTIONS_SET} onChange={onChangeFn} />
  );

  fireEvent.change(getByTestId("select"), { target: { value: "2" } });
  expect(onChangeFn).toHaveBeenCalled();
});

test("Should call the onChange function provided as a prop after clicking an option with a custom value", async () => {
  let selectedValue = null;
  const onChangeFn = jest.fn((event) => {
    selectedValue = event.target.value;
  });
  const { getByTestId } = render(
    <Select
      options={FOUR_OPTIONS_WITH_CUSTOM_KEYS_SET}
      valueKey="option"
      onChange={onChangeFn}
    />
  );

  fireEvent.change(getByTestId("select"), { target: { value: "option-c" } });
  expect(onChangeFn).toHaveBeenCalled();
  expect(selectedValue).toBe("option-c");
});
