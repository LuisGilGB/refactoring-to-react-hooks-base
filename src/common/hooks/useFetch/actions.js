export const ACTIONS = {
  FETCH_EVENT: "FETCH_EVENT",
  SUCCESS_EVENT: "SUCCESS_EVENT",
  ERROR_EVENT: "ERROR_EVENT",
  CLEAN_STATE: "CLEAN_STATE",
};

export const actionCreators = {
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