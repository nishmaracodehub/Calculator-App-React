import React from "react";

const Output = ({ currentValue }) => {
  return (
    <div className="output" id="display">
      {currentValue}
    </div>
  );
};

export default Output;
