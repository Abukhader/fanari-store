import React from "react";
import PropTypes from "prop-types";

const CustomSlider = ({ min, max, value, onChange, valueLabelFormat }) => {
  return (
    <div style={{ width: "100%" }}>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(e, parseInt(e.target.value))}
        style={{
          width: "100%",
          height: "8px",
          borderRadius: "5px",
          backgroundColor: "#ccc",
          outline: "none",
          appearance: "none",
          cursor: "pointer",
        }}
      />
      <output
        style={{
          display: "block",
          marginTop: "5px",
          textAlign: "center",
          fontSize: "14px",
        }}
      >
        {valueLabelFormat(value)}
      </output>
    </div>
  );
};

CustomSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  valueLabelFormat: PropTypes.func.isRequired,
};

export default CustomSlider;
