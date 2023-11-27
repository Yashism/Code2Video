// import React, { useState } from "react";
// import OptButton from "./OptionBtn";
// import GenerateButton from "./GenerateBtn";
// import "../Create.css";
// import video from "../videos/output_video.mp4";

// // ... other imports
// import axios from "axios";

// const InputBox = () => {
//   const [text, setText] = useState(""); // For general text
//   const [code, setCode] = useState(""); // Specifically for code input
//   const [inputType, setInputType] = useState(""); // Start with no type selected
//   const [setVideoUrl] = useState("");

//   const handleTextChange = (event) => {
//     setText(event.target.value);
//   };

//   const handleCodeChange = (event) => {
//     setCode(event.target.value);
//   };

//   const handleTypeChange = (type) => {
//     setInputType(type);
//     // Clear the inputs when the type changes
//     setText("");
//     setCode("");
//   };

//   const handleGenerateClick = async () => {
//     // Construct the data payload based on the type
//     const payload = inputType === "code" ? { code } : { text };

//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:5000/generate_video",
//         {
//           ...payload,
//           type: inputType, // This is 'code' or 'concept'
//         }
//       );
//       setVideoUrl(response.data.video_url);
//     } catch (error) {
//       console.error("Error generating video:", error);
//     }
//   };

//   return (
//     <div className="create flex flex-col justify-center items-center">
//       <p className="text-lg font-semibold mb-2">Video Generator</p>
//       <textarea
//         id="textbox"
//         className="w-full h-60 p-4 border border-gray-400 rounded-md"
//         value={inputType === "code" ? code : text}
//         onChange={inputType === "code" ? handleCodeChange : handleTextChange}
//         placeholder={
//           inputType === "code"
//             ? "Enter your code here."
//             : "Enter your text or concept here."
//         }
//         style={{ margin: "10px 0" }}
//       ></textarea>
//       <OptButton onTypeChange={handleTypeChange} selectedType={inputType} />
//       <div className="button-container">
//         <p>Styles: </p>
//         <button className="button button-beginner">Beginner</button>
//         <button className="button button-programmer">Programmer</button>
//         <button className="button button-academic">Academic</button>
//         <button className="button button-funny">Funny</button>
//       </div>
//       <div style={{ marginTop: "10px" }}>
//         <GenerateButton onGenerateClick={handleGenerateClick} />
//       </div>
//       <video controls width="150%" className="videoPlayer" src={video}></video>
//     </div>
//   );
// };

// export default InputBox;

import React, { useState, useRef } from "react";
import OptButton from "./OptionBtn";
import GenerateButton from "./GenerateBtn";
import "../Create.css";
import video from "../videos/output_video.mp4";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStepBackward,
  faStepForward,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";

const InputBox = () => {
  const [text, setText] = useState(""); // For general text
  const [code, setCode] = useState(""); // Specifically for code input
  const [inputType, setInputType] = useState(""); // Start with no type selected
  const videoRef = useRef(null);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleTypeChange = (type) => {
    setInputType(type);
    // Clear the inputs when the type changes
    setText("");
    setCode("");
  };

  const handleGenerateClick = () => {
    // Your logic for generating the video URL based on text or code
    // For example, if you are using the 'video' import, you can set the URL like this:
    // const generatedVideoUrl = video;

    // Set the generated video URL to videoRef
    if (videoRef.current) {
      videoRef.current.src = video; // Assuming 'video' is the correct URL
    }
  };

  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10; // Skip forward 10 seconds
    }
  };

  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10; // Skip backward 10 seconds
    }
  };

  const handleDownload = () => {
    if (videoRef.current) {
      const a = document.createElement("a");
      a.href = videoRef.current.src;
      a.download = "downloaded_video.mp4";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="create flex flex-col justify-center items-center">
      <p className="text-lg font-semibold mb-2">Video Generator</p>
      <textarea
        id="textbox"
        className="w-full h-60 p-4 border border-gray-400 rounded-md"
        value={inputType === "code" ? code : text}
        onChange={inputType === "code" ? handleCodeChange : handleTextChange}
        placeholder={
          inputType === "code"
            ? "Enter your code here."
            : "Enter your text or concept here."
        }
        style={{ margin: "10px 0" }}
      ></textarea>
      <OptButton onTypeChange={handleTypeChange} selectedType={inputType} />
      <div className="button-container">
        <p>Styles: </p>
        <button className="button button-beginner">Beginner</button>
        <button className="button button-programmer">Programmer</button>
        <button className="button button-academic">Academic</button>
        <button className="button button-funny">Funny</button>
      </div>
      <div style={{ marginTop: "10px" }}>
        <GenerateButton onGenerateClick={handleGenerateClick} />
      </div>
      <video ref={videoRef} controls width="150%" className="videoPlayer">
        <source src={video} type="video/mp4" />
      </video>
      <div className="button-container">
        <button className="button button-beginner" onClick={skipBackward}>
          <FontAwesomeIcon icon={faStepBackward} /> Skip 10s
        </button>
        <button className="button button-beginner" onClick={skipForward}>
          <FontAwesomeIcon icon={faStepForward} /> Skip 10s
        </button>
        <button className="button button-academic" onClick={handleDownload}>
          <FontAwesomeIcon icon={faDownload} /> Download
        </button>
      </div>
    </div>
  );
};

export default InputBox;
