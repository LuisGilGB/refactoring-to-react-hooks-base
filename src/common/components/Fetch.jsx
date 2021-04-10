import PropTypes from "prop-types";
import useFetch from "../hooks/useFetch";

const Fetch = ({ children, url, onFetch, onFetchSuccess, onFetchFailure }) => {
  const { isFetching, success, error, responseData, responseError } = useFetch({
    url,
    onFetch,
    onFetchSuccess,
    onFetchFailure,
  });

  return (
    children &&
    children({ responseData, success, error, isFetching, responseError })
  );
};

Fetch.propTypes = {
  children: PropTypes.func,
  url: PropTypes.string.isRequired,
  onFetch: PropTypes.func,
  onFetchSuccess: PropTypes.func,
  onFetchFailure: PropTypes.func,
};

export default Fetch;
