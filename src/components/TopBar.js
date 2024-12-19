import React, { useState } from "react";
import "../styles/TopBar.css";

const TopBar = ({ onFileChange, onUrlChange, onConfirm }) => {
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [isUrlEntered, setIsUrlEntered] = useState(false);
  const [url, setUrl] = useState("");

  // Check if the URL is valid
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  // Handle file change event
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsFileSelected(true);
      setIsUrlEntered(false);
    }
    onFileChange(event);
  };

  // Handle URL change event
  const handleUrlChange = (event) => {
    setUrl(event.target.value);
    if (event.target.value.trim()) {
      setIsUrlEntered(true);
      setIsFileSelected(false);
    } else {
      setIsUrlEntered(false);
    }
    onUrlChange(event);
  };

  // Handle confirm button click
  const handleConfirm = () => {
    if (isFileSelected) {
      onConfirm();
      setIsFileSelected(false);
    } else if (isUrlEntered && isValidUrl(url)) {
      setIsFileSelected(false);
      setIsUrlEntered(false);
      setUrl("");
      onConfirm();
    } else {
      alert("Please enter a valid URL or select a file.");
    }
  };

  return (
    <div className="top-bar">
      <div className="upload-container">
        <input
          type="file"
          accept="video/mp4"
          onChange={handleFileChange}
          className="file-input"
          id="file-upload"
          disabled={isUrlEntered}
        />
        <label
          htmlFor="file-upload"
          className={`custom-file-label ${isFileSelected ? "selected" : ""} ${
            isUrlEntered ? "disabled" : ""
          }`}
        >
          Choose File
        </label>
        Or
        <input
          type="text"
          placeholder="Enter video URL"
          onChange={handleUrlChange}
          className="url-input"
          value={url}
          disabled={isFileSelected}
        />
        <button
          className={`confirm-button ${
            !(isFileSelected || isUrlEntered) ? "disabled" : ""
          }`}
          onClick={handleConfirm}
          disabled={!(isFileSelected || isUrlEntered)}
        >
          Play Video
        </button>
      </div>
    </div>
  );
};

export default TopBar;
