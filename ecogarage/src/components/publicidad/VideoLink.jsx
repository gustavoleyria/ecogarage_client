import React, { useEffect, useState } from "react";
import axios from "axios";
import YouTube from "react-youtube";
import "../../styles/publicidad/videolink.css";

const URLADSPO = process.env.REACT_APP_URLADSPO;

const VideoLink = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(
        `${URLADSPO}`
      );
      setVideos(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="video-link-container">
      <div className="video-grid">
        {videos.map((video) => (
          <div className="video-item" key={video._id}>
            <h3>{video.title}</h3>
            <p>{video.sponsor}</p>
            <div className="video-player-container">
              <YouTube videoId={getYouTubeVideoId(video.link)} className="youtube-player" opts={{ playerVars: { autoplay: 1 } }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  
};

// Función auxiliar para obtener el ID del video de YouTube desde el enlace
const getYouTubeVideoId = (link) => {
  const url = new URL(link);
  const searchParams = new URLSearchParams(url.search);
  return searchParams.get("v");
};

export default VideoLink;




