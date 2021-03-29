import React from "react";
import PropTypes from "prop-types";

const Select = ({ options = [], onChange }) => {
  return (
    <select onChange={onChange}>
      <option value="">--</option>
      {options.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func,
};

export default Select;
