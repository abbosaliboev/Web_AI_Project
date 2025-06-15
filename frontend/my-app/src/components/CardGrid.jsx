import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/components/_cardGrid.scss";
import { fetchLiveDetections } from "../api/liveDetections";
import { videoStreams } from "../api/videoStreamURLs";
import recLogo from "../assets/icons/rec.png";
import { CameraContext } from "../context/CameraContext";


const CardGrid = () => {
  const navigate = useNavigate();
  const [liveResults, setLiveResults] = useState({});
  const { cameraData } = useContext(CameraContext);

  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await fetchLiveDetections();
      setLiveResults(data);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getStatus = (detections) => {
    if (!detections) return "Unknown";

    const hasFire = detections.some((d) => d.label.toLowerCase() === "fire");
    const hasNoHelmet = detections.some((d) => d.label.toLowerCase() === "head");

    if (hasFire) return "Danger";
    if (hasNoHelmet) return "Warning";
    return "Safe";
  };

  return (
    <div className="container-fluid card-grid-wrapper py-3">
      <div className="row g-4 px-4">
        {cameraData.map((card) => {
          const result = liveResults[card.camId];
          const detections = result?.detections || [];
          const status = getStatus(detections);
          const time = result
            ? new Date(result.timestamp * 1000).toLocaleTimeString()
            : "Loading...";

          const safe = detections.filter(
            (d) => d.label.toLowerCase() === "helmet" || d.label.toLowerCase() === "vest"
          ).length;
          const danger = detections.length - safe;

          return (
            <div key={card.id} className="col-12 col-sm-12 col-lg-12 col-xl-12 px-4">
              <div
                className="card card-camera shadow-sm overflow-hidden"
                onClick={() => navigate(`/dashboard/camera/${card.id}`)}
                style={{ cursor: "pointer", position: "relative" }}
              >
                <div className="card-header d-flex justify-content-between align-items-center bg-light">
                  <div className="d-flex align-items-center gap-4">
                    <span className="fw-bold">{card.cam}</span>
                    <span className="time">{time}</span>
                  </div>

                  <div className="d-flex align-items-center gap-2 fw-bold">
                    {(status === "Danger" || status === "Warning") && (
                      <div className="record me-1">
                        <img src={recLogo} alt="record" />
                      </div>
                    )}
                    <div className="dot orange"></div>
                    <span>{safe}</span>
                    <div className="dot red"></div>
                    <span>{danger}</span>
                  </div>
                </div>

                <div className={`status-bar text-white text-center ${status.toLowerCase()}`}>
                  {status}
                </div>

                <div style={{ position: "relative" }}>
                  <img
                    src={videoStreams[card.camId]}
                    alt={`Live stream for ${card.cam}`}
                    className="img-fluid"
                    style={{ width: "100%", objectFit: "cover" }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardGrid;
