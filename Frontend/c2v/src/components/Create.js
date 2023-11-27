import React, { useState } from 'react';
import GenerateButton from "./GenerateBtn";
import DropdownButton from './Dropdown';
import "../Create.css";
import video from "../videos/output_video.mp4";

// ... other imports
import axios from 'axios';

const InputBox = () => {
  const [text, setText] = useState(''); // For general text
  const [code, setCode] = useState(''); // Specifically for code input
  const [inputType, setInputType] = useState(''); // Start with no type selected
  const [setVideoUrl] = useState('');
  const [showAdditionalTextBox, setShowAdditionalTextBox] = useState(false);
  const [additionalText, setAdditionalText] = useState('');

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleDropdownClick = () => {
    setShowAdditionalTextBox(!showAdditionalTextBox);
  };

  const handleAdditionalTextChange = (event) => {
    setAdditionalText(event.target.value);
  };


  const handleTypeChange = (type) => {
    setInputType(type);
    // Clear the inputs when the type changes
    setText('');
    setCode('');
  };

  const handleTimerSelect = (time) => {
    console.log('Selected time:', time);
    // Handle the selected time as needed
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
    <div className="input-container" style={{ marginTop: "450px" }}>
      <p className="text-lg font-semibold mb-2">Your AI Powered Video Creator</p>
      <div>
        <textarea
          id="textbox"
          className="w-full h-60 p-4 border border-gray-400 rounded-md"
          value={text}
          onChange={handleTextChange}
          placeholder="Enter your text or concept here."
        ></textarea>
        <DropdownButton
          onClick={handleDropdownClick}
        />
      </div>
      <div style={{ marginTop: "10px", zIndex: '1000' }}></div>
      {showAdditionalTextBox && (
        <textarea
          id="additional-textbox"
          className="w-full h-60 p-4 border border-gray-400 rounded-md"
          value={additionalText}
          onChange={handleAdditionalTextChange}
          placeholder="Enter your code"
        ></textarea>
      )}
      <div style={{ marginTop: "10px" }}>
        <GenerateButton onGenerateClick={handleGenerateClick} />
      </div>
      <video controls width="150%" className="videoPlayer" src={video}></video>
    </div>
  );
};

export default InputBox;