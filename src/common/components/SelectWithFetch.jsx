import React from "react";
import PropTypes from "prop-types";
import Fetch from "./Fetch";
import Select from "./Select";

const SelectWithFetch = ({ url, ...selectProps }) => {
  return (
    <Fetch url={url}>
      {({ responseData }) => (
        <Select {...selectProps} options={responseData || []} />
      )}
    </Fetch>
  );
};

SelectWithFetch.propTypes = {
  url: PropTypes.string.isRequired,
};

export default SelectWithFetch;
