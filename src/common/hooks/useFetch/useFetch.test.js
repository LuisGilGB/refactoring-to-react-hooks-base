import { renderHook, act } from "@testing-library/react-hooks";
import {
  INITIAL_ERROR,
  INITIAL_ERROR_MESSAGE,
  INITIAL_IS_FETCHING,
  INITIAL_RESPONSE_DATA,
  INITIAL_SUCCESS,
} from "./consts";
import useFetch from "./useFetch";

test("Should initialize the state with the right initialization values (checks initial values from consts files)", () => {
  const { result } = renderHook(() => useFetch({ url: "" }));

  expect(result.current.isFetching).toBe(INITIAL_IS_FETCHING);
  expect(result.current.success).toBe(INITIAL_SUCCESS);
  expect(result.current.error).toBe(INITIAL_ERROR);
  expect(result.current.responseData).toBe(INITIAL_RESPONSE_DATA);
  expect(result.current.errorMessage).toBe(INITIAL_ERROR_MESSAGE);
});

test("Should initialize the state with the right initialization values (checks raw values such as null or false)", () => {
  const { result } = renderHook(() => useFetch({ url: "" }));

  expect(result.current.isFetching).toBe(false);
  expect(result.current.success).toBe(false);
  expect(result.current.error).toBe(false);
  expect(result.current.responseData).toBe(null);
  expect(result.current.errorMessage).toBe(null);
});
