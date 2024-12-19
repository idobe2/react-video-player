import React from "react";
import TopBar from "./components/TopBar";
import VideoPlayer from "./components/VideoPlayer";
import RecentVideos from "./components/RecentVideos";
import "./styles/App.css";
import "./styles/TopBar.css";
import "./styles/VideoPlayer.css";
import useVideoUpload from "./hooks/useVideoUpload";
import useDarkMode from "./hooks/useDarkMode";

const App = () => {
  const {
    videoSource,
    setVideoSource,
    recentVideos,
    handleFileChange,
    handleUrlChange,
    handleConfirm,
    handleDrop,
    handleDeleteVideo,
  } = useVideoUpload();

  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const handleRecentClick = (url) => {
    setVideoSource(url);
  };

  return (
    <div className={isDarkMode ? "dark-mode" : "light-mode"}>
      <TopBar
        onFileChange={handleFileChange}
        onUrlChange={handleUrlChange}
        onConfirm={handleConfirm}
      />
      <div>
        <VideoPlayer
          videoSource={videoSource}
          setVideoSource={setVideoSource}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          onDrop={handleDrop}
        />
      </div>
      <RecentVideos
        recentVideos={recentVideos}
        onRecentClick={handleRecentClick}
        onDeleteClick={handleDeleteVideo}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default App;
