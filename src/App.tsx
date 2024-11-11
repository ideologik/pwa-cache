import React, { useEffect, useState } from "react";
import "./App.css"; // Importa los estilos aquí

const hdVideoUrl =
  "https://resources.xlearnspace.com/udla/sim/videos/v1_udla_12_d23_Dialogo_m.mp4";
const sdVideoUrl = "/v1_udla_12_d23_Dialogo_m.mp4"; // Video SD en caché

const App: React.FC = () => {
  const [isSDVideoCached, setIsSDVideoCached] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [sdVideoSrc, setSdVideoSrc] = useState<string | null>(null);

  const checkVideoCacheStatus = async () => {
    if ("caches" in window) {
      const cache = await caches.open("video-cache");
      const sdVideo = await cache.match(sdVideoUrl);
      if (sdVideo) {
        setIsSDVideoCached(true);
        setSdVideoSrc(sdVideoUrl); // Configura la fuente del video SD en caché
      }
    }
  };

  const cacheSDVideo = async () => {
    if ("caches" in window) {
      const cache = await caches.open("video-cache");
      try {
        await cache.add(sdVideoUrl);
        setIsSDVideoCached(true);
        setSdVideoSrc(sdVideoUrl);
        console.log("Video SD cacheado con éxito.");
      } catch (error) {
        console.error("Error al cachear el video SD:", error);
      }
    }
  };

  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  useEffect(() => {
    checkVideoCacheStatus();
    if (!isSDVideoCached) {
      cacheSDVideo();
    }
  }, [isSDVideoCached]);

  return (
    <div className="app-container">
      <h1>PWA Cache</h1>
      <h2>Reproducción de Video</h2>

      <button>
        {isOnline ? (
          <video controls width="320" src={hdVideoUrl} />
        ) : isSDVideoCached && sdVideoSrc ? (
          <video controls width="320" src={sdVideoSrc} />
        ) : (
          <p>Descargando el video para reproducción offline...</p>
        )}
      </button>
    </div>
  );
};

export default App;
