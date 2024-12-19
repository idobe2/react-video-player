import React, { useRef, useState, useEffect } from "react";
import "../styles/VideoPlayer.css";

const VideoPlayer = ({ videoSource, isDarkMode, toggleDarkMode, onDrop }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(0.5);

  // Apply dark or light theme to the body element
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [isDarkMode]);
  
    // Auto-play the video when videoSource changes
    useEffect(() => {
      if (videoSource) {
        const video = videoRef.current;
        video.play();
        setIsPlaying(true);
      }
    }, [videoSource]);
  
  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (video.muted) {
      video.muted = false;
      video.volume = previousVolume;
      setIsMuted(false);
    } else {
      setPreviousVolume(video.volume);
      video.muted = true;
      video.volume = 0;
      setIsMuted(true);
    }
  };

  const handleFullScreen = () => {
    const video = videoRef.current;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    }
  };

  const handlePlayPauseSync = () => {
    setIsPlaying(!videoRef.current.paused);
  };

  const handleMuteSync = () => {
    const video = videoRef.current;
    setIsMuted(video.muted || video.volume === 0);
  };

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      video.addEventListener("play", handlePlayPauseSync);
      video.addEventListener("pause", handlePlayPauseSync);
      video.addEventListener("volumechange", handleMuteSync);

      return () => {
        video.removeEventListener("play", handlePlayPauseSync);
        video.removeEventListener("pause", handlePlayPauseSync);
        video.removeEventListener("volumechange", handleMuteSync);
      };
    }
  }, [videoSource]);

  return (
    <div className="main-container">
      <div className="theme-icon" onClick={toggleDarkMode}>
        <img
          src={
            process.env.PUBLIC_URL +
            (isDarkMode ? "/dark-mode-icon.svg" : "/light-mode-icon.svg")
          }
          alt={isDarkMode ? "Dark Mode" : "Light Mode"}
        />
      </div>

<div
  className={`drag-drop-container ${videoSource ? (isPlaying ? "playing" : "no-border") : ""}`}
  onDrop={onDrop}
  onDragOver={(e) => e.preventDefault()}
>
        {videoSource ? (
          <div className="video-wrapper">
            <video
              className="video-element"
              ref={videoRef}
              src={videoSource}
              controls={false}
            />
            <div className="controls-container">
              <div
                className={`play-pause-button ${isPlaying ? "pause" : "play"}`}
                onClick={togglePlayPause}
              ></div>

              <div className="sound-button" onClick={toggleMute}>
                <img
                  src={
                    process.env.PUBLIC_URL +
                    (isMuted ? "/mute-icon.svg" : "/sound-icon.svg")
                  }
                  alt={isMuted ? "Mute" : "Sound"}
                  className="sound-icon"
                />
              </div>
              <div className="fullscreen-button" onClick={handleFullScreen}>
                <img
                  src={process.env.PUBLIC_URL + "/full-screen-icon.svg"}
                  alt="Full Screen Icon"
                  className="full-screen-icon"
                ></img>
              </div>
            </div>
          </div>
        ) : (
          <div className="drag-placeholder">
            <img
              src={process.env.PUBLIC_URL + "/upload-icon.svg"}
              alt="Drag and Drop Icon"
              className="drag-icon"
            ></img>
            Drag and Drop your video file here
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;