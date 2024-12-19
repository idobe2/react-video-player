import React, { useState } from "react";
import "../styles/TopBar.css";

const TopBar = ({ onFileChange, onUrlChange, onConfirm }) => {
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [isUrlEntered, setIsUrlEntered] = useState(false);
  const [url, setUrl] = useState("");

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsFileSelected(true);
      setIsUrlEntered(false); // Reset URL when a file is selected
    }
    onFileChange(event);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
    if (event.target.value.trim()) {
      setIsUrlEntered(true);
      setIsFileSelected(false); // Reset file input when URL is entered
    } else {
      setIsUrlEntered(false);
    }
    onUrlChange(event);
  };

  const handleConfirm = () => {
    if (isFileSelected) {
      onConfirm();
      setIsFileSelected(false);
    } else if (isUrlEntered && isValidUrl(url)) {
      setIsFileSelected(false);
      setIsUrlEntered(false);
      setUrl(""); // Reset URL input
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
          disabled={isUrlEntered} // Disable file input when URL is entered
        />
        {/* Custom button to trigger file input */}
        <label
          htmlFor="file-upload"
          className={`custom-file-label ${isFileSelected ? "selected" : ""}`}
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
          disabled={isFileSelected} // Disable URL input when file is selected
        />
        <button
          className={`confirm-button ${!(isFileSelected || isUrlEntered) ? "disabled" : ""}`}
          onClick={handleConfirm}
          disabled={!(isFileSelected || isUrlEntered)} // Disable button if no file or URL is chosen
        >
          Play Video
        </button>
      </div>
    </div>
  );
};

export default TopBar;
