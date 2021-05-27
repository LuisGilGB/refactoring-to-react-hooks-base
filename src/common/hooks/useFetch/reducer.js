import { ACTIONS } from "./actions";
import { initialState } from "./consts";

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

export default fetchReducer;
