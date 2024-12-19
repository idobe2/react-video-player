import React from "react";
import "../styles/DragDropContainer.css";

const DragDropContainer = ({ onDrop, videoSource, children }) => {
  return (
    <div
      className={`drag-drop-container ${videoSource ? "video-loaded" : ""}`}
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      {!videoSource && (
        <div className="drag-placeholder">
          <img
            src={process.env.PUBLIC_URL + "/upload-icon.svg"}
            alt="Drag and Drop Icon"
            className="drag-icon"
          />
          Drag and Drop your video file here
        </div>
      )}
      {children}
    </div>
  );
};

export default DragDropContainer;
