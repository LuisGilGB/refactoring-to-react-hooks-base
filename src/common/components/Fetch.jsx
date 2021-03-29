import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Fetch = ({ children, url }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsFetching(true);
    setResponseData(null);
    setError(null);
    fetch(url, {})
      .then((res) => res.json())
      .then((data) => {
        setIsFetching(false);
        setResponseData(data);
      })
      .catch((err) => {
        setIsFetching(false);
        setError(err);
      });
  }, [url]);

  return <>{children}</>;
};

Fetch.propTypes = {
  url: PropTypes.string.isRequired
};

export default Fetch;
