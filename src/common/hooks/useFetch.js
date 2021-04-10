import { useEffect, useReducer } from "react";

const ACTIONS = {
  FETCH_EVENT: "FETCH_EVENT",
  SUCCESS_EVENT: "SUCCESS_EVENT",
  ERROR_EVENT: "ERROR_EVENT",
  CLEAN_STATE: "CLEAN_STATE",
};

const actionCreators = {
  doFetch: () => ({
    type: ACTIONS.FETCH_EVENT,
    payload: {},
  }),
  onSuccess: (responseData) => ({
    type: ACTIONS.SUCCESS_EVENT,
    payload: { responseData },
  }),
  onError: (responseError) => ({
    type: ACTIONS.ERROR_EVENT,
    payload: { responseError },
  }),
  cleanState: () => ({
    type: ACTIONS.CLEAN_STATE,
    payload: {},
  }),
};

const initialState = {
  isFetching: false,
  success: false,
  error: false,
  responseData: null,
  responseError: null,
};

const fetchReducer = (state, { type, payload }) => {
  const actionReducers = {
    [ACTIONS.FETCH_EVENT]: () => ({
      isFetching: true,
      success: false,
      error: false,
    }),
    [ACTIONS.SUCCESS_EVENT]: () => ({
      isFetching: false,
      success: true,
      error: false,
      responseData: payload.responseData,
      responseError: initialState.responseError
    }),
    [ACTIONS.ERROR_EVENT]: () => ({
      isFetching: false,
      success: false,
      error: true,
      responseData: initialState.responseError,
      responseError: initialState.responseError
    }),
    [ACTIONS.CLEAN_STATE]: () => initialState,
  };
  return actionReducers[type] ? { ...state, ...actionReducers[type]() } : state;
};

const useFetch = ({ url, onFetch, onFetchSuccess, onFetchFailure }) => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    if (url) {
      dispatch(actionCreators.doFetch());
      onFetch && onFetch();
      fetch(url, {})
        .then((res) => res.json())
        .then((data) => {
          dispatch(actionCreators.onSuccess(data));
          onFetchSuccess && onFetchSuccess(data);
        })
        .catch((err) => {
          dispatch(actionCreators.onError(err));
          onFetchFailure && onFetchFailure(err);
        });
    } else {
      dispatch(actionCreators.cleanState());
    }
  }, [url, onFetch, onFetchSuccess, onFetchFailure]);

  return state;
};

export default useFetch;
