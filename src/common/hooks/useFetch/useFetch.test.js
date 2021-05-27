import { act, renderHook } from "@testing-library/react-hooks";
import { SALES_ENDPOINT } from "../../../features/Dashboard/consts";
import {
  INITIAL_ERROR,
  INITIAL_ERROR_MESSAGE,
  INITIAL_IS_FETCHING,
  INITIAL_RESPONSE_DATA,
  INITIAL_SUCCESS,
} from "./consts";
import useFetch from "./useFetch";

const TEST_URL = SALES_ENDPOINT;

const buildRequestMockWithTimeout = (resolver) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        json: resolver,
      });
    }, 200 + Math.random() * 300)
  );
};

const ERROR_FETCH_MOCK = () => Promise.reject("An error happened");

const SALES_MOCK = {
  data: [
    {
      amount: 359,
      timestamp: "2020-01-01T16:30:41.000Z",
    },
    {
      amount: 361,
      timestamp: "2020-01-02T04:30:41.000Z",
    },
    {
      amount: 337,
      timestamp: "2020-01-02T16:30:41.000Z",
    },
  ],
};
const SUCCESFUL_SALES_FETCH_MOCK = JSON.stringify(SALES_MOCK);

beforeEach(() => {
  fetch.resetMocks();
});

test("Should initialize the state with the right initialization values (checks initial values from consts files)", () => {
  const { result } = renderHook(() =>
    useFetch({ url: TEST_URL })
  );

  expect(result.current.isFetching).toBe(INITIAL_IS_FETCHING);
  expect(result.current.success).toBe(INITIAL_SUCCESS);
  expect(result.current.error).toBe(INITIAL_ERROR);
  expect(result.current.responseData).toBe(INITIAL_RESPONSE_DATA);
  expect(result.current.errorMessage).toBe(INITIAL_ERROR_MESSAGE);
});

test("Should initialize the state with the right initialization values (checks raw values such as null or false)", () => {
  const { result } = renderHook(() =>
    useFetch({ url: TEST_URL })
  );

  expect(result.current.isFetching).toBe(false);
  expect(result.current.success).toBe(false);
  expect(result.current.error).toBe(false);
  expect(result.current.responseData).toBe(null);
  expect(result.current.errorMessage).toBe(null);
});

test("Should return isFetching right after calling update function", async () => {
  const { result, waitForNextUpdate } = renderHook(() =>
    useFetch({ url: TEST_URL })
  );

  act(() => {
    result.current.update();
  });

  await waitForNextUpdate();

  expect(result.all[1].isFetching).toBe(true);
  expect(result.all[1].success).toBe(false);
  expect(result.all[1].error).toBe(false);
  expect(result.all[1].responseData).toBe(null);
  expect(result.all[1].errorMessage).toBe(null);
});

test("Should return response data and success true after receiving a successful response", async () => {
  fetch.mockResponse(SUCCESFUL_SALES_FETCH_MOCK);

  const { result, waitForNextUpdate } = renderHook(() =>
    useFetch({ url: TEST_URL })
  );

  act(() => {
    result.current.update();
  });

  await waitForNextUpdate();

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(SALES_ENDPOINT);
  expect(result.current.isFetching).toBe(false);
  expect(result.current.success).toBe(true);
  expect(result.current.error).toBe(false);
  expect(result.current.responseData).toEqual(SALES_MOCK);
  expect(result.current.errorMessage).toBe(null);
});

test("Should return error message and error true after receiving an error response", async () => {
  fetch.mockReject(buildRequestMockWithTimeout(ERROR_FETCH_MOCK));

  const { result, waitForNextUpdate } = renderHook(() =>
    useFetch({ url: TEST_URL })
  );

  act(() => {
    result.current.update();
  });

  await waitForNextUpdate();

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(SALES_ENDPOINT);
  expect(result.current.isFetching).toBe(false);
  expect(result.current.success).toBe(false);
  expect(result.current.error).toBe(true);
  expect(result.current.responseData).toBe(null);
  expect(result.current.errorMessage).toBe(null);
});
