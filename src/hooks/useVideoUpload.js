import { useState } from "react";

const useVideoUpload = () => {
  const [videoSource, setVideoSource] = useState("");
  const [tempVideoSource, setTempVideoSource] = useState("");
  const [recentVideos, setRecentVideos] = useState([]);

  // Handle file change event
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setTempVideoSource(videoUrl);
    }
  };

  // Handle URL change event
  const handleUrlChange = (event) => {
    setTempVideoSource(event.target.value);
  };

  // Handle confirm button click
  const handleConfirm = () => {
    if (tempVideoSource) {
      if (tempVideoSource.startsWith("http")) {
        try {
          new URL(tempVideoSource);
        } catch (error) {
          alert("The URL you entered is not valid. Please enter a valid URL.");
          return;
        }
      }
      setVideoSource(tempVideoSource);
      if (tempVideoSource && !recentVideos.includes(tempVideoSource)) {
        setRecentVideos([...recentVideos, tempVideoSource]);
      }
    } else {
      alert("Please select a video file or enter a valid URL.");
    }
  };

  // Handle drop event
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("video/")) {
      const videoUrl = URL.createObjectURL(file);
      setVideoSource(videoUrl);
      if (!recentVideos.includes(videoUrl)) {
        setRecentVideos((prev) => [...prev, videoUrl]);
      }
    }
  };

  // Handle delete video
  const handleDeleteVideo = (url) => {
    setRecentVideos((prevVideos) =>
      prevVideos.filter((video) => video !== url)
    );
  };

  return {
    videoSource,
    setVideoSource,
    tempVideoSource,
    setTempVideoSource,
    recentVideos,
    setRecentVideos,
    handleFileChange,
    handleUrlChange,
    handleConfirm,
    handleDrop,
    handleDeleteVideo,
  };
};

export default useVideoUpload;
