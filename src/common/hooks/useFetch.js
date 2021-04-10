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
  onError: (errorMessage) => ({
    type: ACTIONS.ERROR_EVENT,
    payload: { errorMessage },
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
  errorMessage: null,
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
      errorMessage: initialState.errorMessage,
    }),
    [ACTIONS.ERROR_EVENT]: () => ({
      isFetching: false,
      success: false,
      error: true,
      responseData: initialState.responseData,
      errorMessage: initialState.errorMessage,
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
        .then((res) => {
          if (!res.ok) {
            onFetchFailure(res.statusText);
            throw Error(res.statusText);
          }
          return res.json();
        })
        .then((data) => {
          dispatch(actionCreators.onSuccess(data));
          onFetchSuccess && onFetchSuccess(data);
        })
        .catch((err) => {
          dispatch(actionCreators.onError(err));
          onFetchFailure && onFetchFailure(err.message);
        });
    } else {
      dispatch(actionCreators.cleanState());
    }
  }, [url, onFetch, onFetchSuccess, onFetchFailure]);

  return state;
};

export default useFetch;
