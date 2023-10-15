import React, { useState } from 'react';
import ConceptButton from "./ConceptBtn";
import CodeButton from "./CodeBtn";
import MenuButton from "./MenuBtn";
import "../Create.css"; // Make sure to import your CSS file

const InputBox = () => {
  const [text, setText] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="top-left">
        <MenuButton /> 
      </div>
      <p className="text-lg font-semibold mb-2">Ready to see your code come to life? Enter your code or a concept below to get started.</p>
      <textarea
        id="textbox"
        className="w-full h-40 p-4 border border-gray-300 rounded-md"
        value={text}
        onChange={handleChange}
        placeholder="Start typing here"
      ></textarea>
      <div className="topline"></div>
      <div className="underline"></div>
      <div className="flex justify-between mt-4">
        <ConceptButton style={{ marginTop: "50px" }} />
        <CodeButton style={{ marginTop: "50px" }}/>
      </div>
    </div>
  );
};

export default InputBox;
