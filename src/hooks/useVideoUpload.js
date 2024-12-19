import { useState } from "react";

const useVideoUpload = () => {
  const [videoSource, setVideoSource] = useState("");
  const [tempVideoSource, setTempVideoSource] = useState("");
  const [recentVideos, setRecentVideos] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setTempVideoSource(videoUrl);
    }
  };

  const handleUrlChange = (event) => {
    setTempVideoSource(event.target.value);
  };

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
  };
};

export default useVideoUpload;