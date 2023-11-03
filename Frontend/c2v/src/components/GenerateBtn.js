import React from 'react';
import '../GenerateBtn.css'; // Import your CSS file

const GenerateButton = () => {
  return (
    <button className="full-rounded"> {/* Use className instead of class */}
      <span>Generate</span>
      <div className="border full-rounded"></div>
    </button>
  );
};

export default GenerateButton;
