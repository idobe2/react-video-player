import React, { useRef, useState, useEffect } from "react";
import "../styles/VideoPlayer.css";
import DragDropContainer from "./DragDropContainer";

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

  // Toggle play/pause state of the video
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

  // Toggle mute/unmute state of the video
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

  // Enter or exit full screen mode
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

  // Sync play/pause state with the video element
  const handlePlayPauseSync = () => {
    setIsPlaying(!videoRef.current.paused);
  };

  // Sync mute/unmute state with the video element
  const handleMuteSync = () => {
    const video = videoRef.current;
    setIsMuted(video.muted || video.volume === 0);
  };

  // Play/pause the video when clicked
  const handleVideoClick = () => {
    togglePlayPause();
  };

  // Enter or exit full screen mode when double clicked
  const handleVideoDoubleClick = () => {
    handleFullScreen();
  };

  // Play/pause the video when space key is pressed
  const handleKeyDown = (event) => {
    if (event.code === "Space") {
      event.preventDefault();
      togglePlayPause();
    }
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

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

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

      <DragDropContainer
        onDrop={onDrop}
        videoSource={videoSource}
        isDarkMode={isDarkMode}
      >
        {videoSource && (
          <div className="video-wrapper">
            <video
              className="video-element"
              ref={videoRef}
              src={videoSource}
              controls={false}
              onClick={handleVideoClick}
              onDoubleClick={handleVideoDoubleClick}
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
        )}
      </DragDropContainer>
    </div>
  );
};

export default VideoPlayer;
