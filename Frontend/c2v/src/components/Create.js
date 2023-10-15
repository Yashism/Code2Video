import "../Create.css"
import React, { useState } from 'react';
import ConceptButton from "./ConceptBtn";
import CodeButton from "./CodeBtn";

const InputBox = () => {
  const [text, setText] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-lg font-semibold mb-2">Ready to see your code come to life? Enter your code or a concept below to get started.</p>
      <textarea
        id="textbox"
        className="w-full h-40 p-4 border border-gray-300 rounded-md"
        value={text}
        onChange={handleChange}
        placeholder="Start typing here"
      ></textarea>
      <div class="topline"></div>
      <div class="underline"></div>
      <div className="flex justify-between mt-4">
        <ConceptButton />
        <CodeButton />
      </div>
    </div>
  );
};

export default InputBox;