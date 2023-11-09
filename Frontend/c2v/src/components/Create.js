import React, { useState } from 'react';
import OptButton from "./OptionBtn";
import GenerateButton from "./GenerateBtn";
import "../Create.css";
// ... other imports
import axios from 'axios';

const InputBox = () => {
  const [text, setText] = useState(''); // For general text
  const [code, setCode] = useState(''); // Specifically for code input
  const [inputType, setInputType] = useState(''); // Start with no type selected
  const [videoUrl, setVideoUrl] = useState('');

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleTypeChange = (type) => {
    setInputType(type);
    // Clear the inputs when the type changes
    setText('');
    setCode('');
  };

  const handleGenerateClick = async () => {
    // Construct the data payload based on the type
    const payload = inputType === 'code' ? { code } : { text };

    try {
      const response = await axios.post('http://127.0.0.1:5000/generate_video', {
        ...payload,
        type: inputType, // This is 'code' or 'concept'
      });
      setVideoUrl(response.data.video_url);
    } catch (error) {
      console.error('Error generating video:', error);
    }
  };

  return (
    <div className="create flex flex-col justify-center items-center">
      <p className="text-lg font-semibold mb-2">Video Generator</p>
      <textarea
        id="textbox"
        className="w-full h-60 p-4 border border-gray-400 rounded-md"
        value={inputType === 'code' ? code : text}
        onChange={inputType === 'code' ? handleCodeChange : handleTextChange}
        placeholder={inputType === 'code' ? "Enter your code here." : "Enter your text or concept here."}
        style={{ margin: "10px 0" }}
      ></textarea>
      <OptButton onTypeChange={handleTypeChange} selectedType={inputType} />
      <div style={{ marginTop: "10px" }}>
        <GenerateButton onGenerateClick={handleGenerateClick} />
      </div>
      {videoUrl && (
        <div style={{ marginTop: "30px" }}>
          <video src={videoUrl} controls style={{ maxWidth: "100%" }} />
        </div>
      )}
    </div>
  );
};

export default InputBox;
