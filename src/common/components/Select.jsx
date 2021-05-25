import React from "react";
import PropTypes from "prop-types";

const Select = ({
  options = [],
  valueKey = "value",
  labelKey = "label",
  onChange,
  ...otherProps
}) => {
  return (
    <select {...otherProps} data-cy="select" onChange={onChange}>
      <option value="" data-testid="select-default-option">
        --
      </option>
      {(options || []).map(({ [labelKey]: label, [valueKey]: value }, i) => (
        <option
          data-testid="select-option"
          key={value || `option-${i}`}
          value={value}
        >
          {label}
        </option>
      ))}
    </select>
  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })
  ).isRequired,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  onChange: PropTypes.func,
};

export default Select;
