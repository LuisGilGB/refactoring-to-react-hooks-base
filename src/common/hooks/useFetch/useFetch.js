import { useCallback, useMemo, useReducer } from "react";
import { actionCreators } from "./actions";
import { initialState } from "./consts";
import fetchReducer from "./reducer";

const useFetch = ({ url, onFetch, onFetchSuccess, onFetchFailure }) => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  const update = useCallback(() => {
    if (url) {
      dispatch(actionCreators.doFetch());
      onFetch && onFetch();
      fetch(url)
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

  const returnValue = useMemo(
    () => ({
      ...state,
      update,
    }),
    [state, update]
  );

  return returnValue;
};

export default useFetch;
