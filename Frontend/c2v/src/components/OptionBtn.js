import React from 'react';
import '../OptionBtn.css'; // Import  CSS file

const OptButton = () => {
  return (
    <div className="special-radio-inputs">
      <label className="radio">
        <input type="radio" name="radio" checked />
        <span className="name">Code</span>
      </label>
      <label className="radio">
        <input type="radio" name="radio" />
        <span className="name">Concept</span>
      </label>
    </div>
  );
};

export default OptButton;
