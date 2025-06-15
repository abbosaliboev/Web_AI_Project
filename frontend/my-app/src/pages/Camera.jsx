import React, { useState, useEffect, useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import icons from "../assets/constants/icons";
import "../assets/components/_camera.scss";
import { videoStreams } from "../api/videoStreamURLs";
import { CameraContext } from "../context/CameraContext";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useOutletContext } from "react-router-dom";


const Camera = () => {
  const { id } = useParams();
  const { cameraData } = useContext(CameraContext);
  const camera = cameraData.find((cam) => cam.id === parseInt(id));
  const streamUrl = camera ? videoStreams[camera.camId] : null;
  const { t } = useTranslation();

  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState("most_recent");

  useEffect(() => {
    console.log("Icons objects:", icons);
  }, []);

  // Memoize alert counts
  const alertCounts = useMemo(() => {
    console.log("alerts:", alerts);
    const counts = alerts.reduce(
      (acc, alert) => {
        const alertType = alert.alert_type ? alert.alert_type.toLowerCase() : "unknown";
        console.log(`Alert ID: ${alert.id}, Alert type: ${alertType}, Timestamp: ${alert.timestamp}`);
        if (alertType === "no_helmet") acc.noHelmet += 1;
        else if (alertType === "danger_zone") acc.dangerZone += 1;
        else if (alertType === "fire") acc.fire += 1;
        else if (alertType === "fall") acc.fall += 1;
        else acc.unknown += 1;
        return acc;
      },
      { noHelmet: 0, dangerZone: 0, fire: 0, fall: 0, unknown: 0 }
    );
    console.log("Counts:", counts);
    return counts;
  }, [alerts]);

  // Fetch alerts
  useEffect(() => {
    let intervalId;

    const fetchAlerts = () => {
      if (camera) {
        axios
          .get(`http://localhost:8000/api/alerts?pcamera_id=${camera.id}`)
          .then((res) => {
            console.log("API:", res.data);
            setAlerts(Array.isArray(res.data) ? res.data : []);
          })
          .catch((err) => {
            console.error("error:", err);
            setAlerts([]);
          });
      }
    };

    fetchAlerts();
    intervalId = setInterval(fetchAlerts, 10000);

    return () => clearInterval(intervalId);
  }, [camera]);


  useEffect(() => {
    console.log("New alerts state:", alerts);
  }, [alerts]);

  // Sort alerts based on filter
  const sortedAlerts = useMemo(() => {
    console.log("Sorting alerts:", alerts);
    return [...alerts]
      .filter((alert) => alert.timestamp && alert.alert_type)
      .sort((a, b) => {
        const dateA = new Date(a.timestamp);
        const dateB = new Date(b.timestamp);
        if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
          console.warn("invalid timestamp:", a.timestamp, b.timestamp);
          return 0;
        }
        return filter === "most_recent" ? dateB - dateA : dateA - dateB;
      });
  }, [alerts, filter]);

  const formatTime = (isoString) => {
    try {
      const date = new Date(isoString);
      if (isNaN(date.getTime())) throw new Error("Invalid date");
      return date.toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    } catch (error) {
      console.error(`eroor in formating time: ${isoString}`, error);
      return "Invalid Time";
    }
  };


  const getIconSrc = (alertType) => {
    const type = alertType?.toLowerCase();
    if (type === "no_helmet") return icons.helmet;
    if (type === "danger_zone") return icons.zone;
    if (type === "fire") return icons.fire;
    if (type === "fall") return icons.fall;
    return icons.default;
  };

  const { refreshKey } = useOutletContext();

  useEffect(() => {
    console.log("Camera page refreshed");
  }, [refreshKey]);

  return (
    <div className="container-fluid camera-page">
      <div className="row g-4">
        {/* Alerts panel */}
        <div className="col-12 col-lg-3 px-3">
          <h2 className="mb-4 fw-bold">{t("alertsTitle")}</h2>
          <div className="alerts-card">
            <div className="alert-filter mb-2">
              <select
                className="form-select px-2"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="most_recent">{t("filterRecent")}</option>
                <option value="oldest">{t("filterOldest")}</option>
              </select>
            </div>
            <div className="alert-list">
              {sortedAlerts.length > 0 ? (
                sortedAlerts.map((alert, i) => {
                  const alertType = alert.alert_type?.toLowerCase();
                  const iconSrc = getIconSrc(alertType);
                  console.log(`Rendering alert: ${alertType}, Icon: ${iconSrc}`);
                  return (
                    <div
                      key={alert.id || i}
                      className="alert-item d-flex justify-content-between align-items-center p-2 mb-2 rounded"
                    >
                      <span>
                        {formatTime(alert.timestamp)}
                      </span>
                      <img
                        src={iconSrc}
                        alt={alert.alert_type || "Unknown"}
                        width={24}
                        height={24}
                        onError={(e) => {
                          console.error(`Icons are not loaded: ${alertType}, path: ${iconSrc}`);
                        }}
                      />
                    </div>
                  );
                })
              ) : (
                <div className="text-center text-muted p-2">{t("noAlerts")}</div>
              )}
            </div>
          </div>
        </div>

        {/* Video feed */}
        <div className="col-12 col-lg-6 px-3">
          <div className="buttons d-flex justify-content-between align-items-center mb-4">
            {/*<div className="data-filter d-flex align-items-center gap-2">
              <input type="date" className="form-control" style={{ maxWidth: "200px" }} />
              <input type="time" className="form-control" style={{ maxWidth: "150px" }} />
            </div>*/}
            <div className="photo-video-toggle d-flex gap-2">
              <button className="btn bg-light">
                <i className="bi bi-camera text-dark"></i>
              </button>
              <button className="btn bg-light">
                <i className="bi bi-camera-video-fill text-dark"></i>
              </button>
            </div>
          </div>

          <div className="video-section p-4 bg-light" style={{ position: "relative", width: "100%" }}>
            {streamUrl ? (
              <div className="video-wrapper" style={{ position: "relative", width: "100%" }}>
                <img
                  id={`video-cam${camera.camId}`}
                  src={streamUrl}
                  alt={`Live stream for Camera ${id}`}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
            ) : (
              <div className="text-center text-danger">{t("camera.noStream", { id })}</div>
            )}
          </div>
        </div>

        {/* Stats + detections */}
        <div className="col-12 col-lg-3 px-3">
          <div className="stats-section d-flex flex-column gap-4">
            <div className="alert-box d-flex align-items-center justify-content-center">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              <span>{alerts.length} {t("totalAlerts")}</span>
            </div>
            <div className="summary-card p-4 rounded text-white">
              <div className="row text-center">
                {[
                  { label: "No Helmet", icon: icons.helmet, count: alertCounts.noHelmet },
                  { label: "Danger Zone", icon: icons.zone, count: alertCounts.dangerZone },
                  { label: "Fire", icon: icons.fire, count: alertCounts.fire },
                  { label: "Fall", icon: icons.fall, count: alertCounts.fall },
                ].map(({ label, icon, count }) => (
                  <div className="col-6 mb-3" key={label}>
                    <div className="label">{label}</div>
                    <div className="count-box d-flex align-items-center justify-content-center gap-3">
                      <div className="count">{count}</div>
                      <div className="summary-icon">
                        <img src={icon} alt={label} width={24} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* <div className="chart p-3 bg-white rounded shadow-sm">
              <h6>Line Chart</h6>
              <img
                src="https://storage.googleapis.com/dycr-web/image/topic/chartjs/v2/line-graph.png"
                alt="chart"
                className="img-fluid"
              />
            </div> */}
            {/*<div className="detections bg-white rounded shadow-sm">
              <h6>{t("detections")}</h6>
              <div className="detect-list">
                <div className="detect-row d-flex justify-content-between mb-2">
                  <span>Worker ID: 01</span>
                  <span>7</span>
                </div>
                <div className="detect-row d-flex justify-content-between mb-2">
                  <span>Worker ID: 02</span>
                  <span>6</span>
                </div>
                <div className="detect-row d-flex justify-content-between mb-2">
                  <span>Worker ID: 03</span>
                  <span>9</span>
                </div>
              </div>
            </div>*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Camera;