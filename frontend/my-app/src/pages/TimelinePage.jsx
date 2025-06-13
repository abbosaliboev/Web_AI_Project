import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";

// Assets
import "../assets/components/_timeline.scss";
import icons from "../assets/constants/icons";
import sampleImage from "../assets/images/test.png";

// Modal
import ReportModal from "../components/ReportModal";

const TimelinePage = () => {
  const { t } = useTranslation();

  const alerts = [
    { camera: "Cam 1", timestamp: "2025-02-12T18:25:00", alert_type: "Helmet" },
    { camera: "Cam 1", timestamp: "2025-02-12T18:12:00", alert_type: "Vest" },
    { camera: "Cam 1", timestamp: "2025-02-12T18:05:00", alert_type: "Helmet" },
    { camera: "Cam 2", timestamp: "2025-02-12T16:45:00", alert_type: "NoVest" },
    { camera: "Cam 2", timestamp: "2025-02-12T18:12:00", alert_type: "Vest" },
    { camera: "Cam 3", timestamp: "2025-02-12T18:25:00", alert_type: "Helmet" },
    { camera: "Cam 4", timestamp: "2025-02-12T17:54:00", alert_type: "Vest" },
    { camera: "Cam 4", timestamp: "2025-02-12T16:45:00", alert_type: "NoVest" },
  ];

  const [selectedCam, setSelectedCam] = useState("Cam 1");
  const [filter, setFilter] = useState("most_recent");
  const [showModal, setShowModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const sortedAlerts = useMemo(() => {
    return [...alerts].sort((a, b) =>
      filter === "most_recent"
        ? new Date(b.timestamp) - new Date(a.timestamp)
        : new Date(a.timestamp) - new Date(b.timestamp)
    );
  }, [alerts, filter]);

  const archiveRecords = sortedAlerts.filter((a) => a.camera === selectedCam);
  const uniqueCams = [...new Set(alerts.map((a) => a.camera))];

  const formatTime = (str) => new Date(str).toLocaleString();

  const handleRecordClick = (record) => {
    setSelectedRecord(record);
    setShowModal(true);
  };

  const handleReportSubmit = (reportData) => {
    console.log("Report submitted:", reportData);
    setShowModal(false);
  };

  return (
    <div className="container-fluid timeline-page p-4">
      <div className="row">

        {/* Left Panel: Alerts */}
        <div className="col-12 col-lg-3 px-2 alerts-panel">
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
              {sortedAlerts.map((alert, i) => (
                <div
                  key={i}
                  className="alert-item d-flex justify-content-between align-items-center p-2 mb-2 rounded"
                >
                  <span>{formatTime(alert.timestamp)}</span>
                  <img
                    src={icons[alert.alert_type.toLowerCase()] || icons.zone}
                    alt={alert.alert_type}
                    width={24}
                    height={24}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel: Archive */}
        <div className="col-12 col-lg-9">
          <h2 className="fw-bold mb-4">{t("archiveTitle")}</h2>

          <div className="archive-container p-4 rounded shadow-sm">
            {/* Camera selector */}
            <div className="buttons mb-3">
              {uniqueCams.map((cam) => (
                <button
                  key={cam}
                  className={`btn ${cam === selectedCam ? "btn-dark" : "btn-outline-dark"}`}
                  onClick={() => setSelectedCam(cam)}
                >
                  {cam}
                </button>
              ))}
            </div>

            <hr />

            {/* Archive list */}
            <div className="record-list">
              {archiveRecords.map((rec, i) => (
                <div
                  key={i}
                  className="record-card p-3 mb-3 rounded shadow-sm"
                  onClick={() => handleRecordClick(rec)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="d-flex align-items-center card-in">
                    <img
                      src={sampleImage}
                      alt="record"
                      className="me-3"
                      style={{
                        width: "240px",
                        height: "160px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                    <div>
                      <p className="mb-1">
                        <strong>{t("time")}:</strong> {formatTime(rec.timestamp)}
                      </p>
                      <p className="mb-0">
                        <strong>{t("situation")}:</strong>{" "}
                        {t("detect", { type: rec.alert_type })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedRecord && (
        <ReportModal
          record={selectedRecord}
          onClose={() => setShowModal(false)}
          onSubmit={handleReportSubmit}
        />
      )}
    </div>
  );
};

export default TimelinePage;
