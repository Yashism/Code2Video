import React, { useState } from 'react';
import OptButton from "./OptionBtn";
import GenerateButton from "./GenerateBtn";
import "../Create.css"; // import your CSS file


const InputBox = () => {
  const [text, setText] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className="create flex flex-col justify-center items-center">
      <p className="text-lg font-semibold mb-2">Video Generator</p>
      <textarea
        id="textbox"
        className="w-full h-60 p-4 border border-gray-400 rounded-md"
        value={text}
        onChange={handleChange}
        placeholder="Ready to see your code come to life? Enter your code or a concept to get started."
        style={{ margin: "10px 0" }} 
      ></textarea>
      <div className="topline"></div>
      <div className="underline"></div>
      <div className="flex justify-between mt-6 space-x-8">
        <div className="input-container">
          <OptButton />
        </div>
      </div>
      <div style={{ marginTop: "10px" }}> {/* Add margin-top to create space above the Generate button */}
        <GenerateButton />
      </div>
    </div>
  );
};

export default InputBox;
