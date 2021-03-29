import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Fetch = ({ children, url, onFetch, onFetchSuccess, onFetchFailure }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsFetching(true);
    setResponseData(null);
    setError(null);
    onFetch && onFetch();
    fetch(url, {})
      .then((res) => res.json())
      .then((data) => {
        setIsFetching(false);
        setResponseData(data);
        onFetchSuccess && onFetchSuccess(data);
      })
      .catch((err) => {
        setIsFetching(false);
        setError(err);
        onFetchFailure && onFetchFailure(err);
      });
  }, [url]);

  return children && children({responseData, isFetching, error});
};

Fetch.propTypes = {
  children: PropTypes.func,
  url: PropTypes.string.isRequired,
  onFetch: PropTypes.func,
  onFetchSuccess: PropTypes.func,
  onFetchFailure: PropTypes.func,
};

export default Fetch;
