import React, { useState, useEffect } from "react";
import "../styles/RecentVideos.css";

const RecentVideos = ({ recentVideos, onRecentClick, onDeleteClick }) => {
  const [thumbnails, setThumbnails] = useState({});
  const [loadingStates, setLoadingStates] = useState({});

  useEffect(() => {
    recentVideos.forEach((url) => {
      if (!thumbnails[url]) {
        const video = document.createElement("video");
        video.crossOrigin = "anonymous";
        video.src = url;

        video.addEventListener("loadeddata", () => {
          video.currentTime = 2;
        });

        video.addEventListener("seeked", () => {
          const canvas = document.createElement("canvas");
          canvas.width = video.videoWidth / 4;
          canvas.height = video.videoHeight / 4;
          const context = canvas.getContext("2d");
          context.drawImage(video, 0, 0, canvas.width, canvas.height);

          setThumbnails((prevThumbnails) => ({
            ...prevThumbnails,
            [url]: canvas.toDataURL(),
          }));

          setLoadingStates((prevStates) => ({
            ...prevStates,
            [url]: false,
          }));
        });

        setLoadingStates((prevStates) => ({
          ...prevStates,
          [url]: true,
        }));
      }
    });
  }, [recentVideos, thumbnails]);

  const getVideoName = (url) => {
    const parts = url.split("/");
    const fileName = parts[parts.length - 1];
    return fileName.replace(".mp4", "");
  };

  return (
    <div className="recent-videos">
      <h3>Recent Videos</h3>
      {recentVideos.length === 0 ? (
        <p className="no-videos-message">No recent videos. Please choose a local video or enter a video URL.</p>
      ) : (
        <ul>
          {recentVideos.map((url, index) => (
            <li key={index} className="video-item">
              {loadingStates[url] ? (
                <div className="spinner"></div>
              ) : thumbnails[url] ? (
                <img src={thumbnails[url]} alt="Video Thumbnail" className="video-thumbnail" />
              ) : (
                <span className="error-indicator">Error loading</span>
              )}
              <span className="video-name" onClick={() => onRecentClick(url)}>
                {getVideoName(url)}
              </span>
              <button className="delete-button" onClick={() => onDeleteClick(url)}>
                ✖
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentVideos;
