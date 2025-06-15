import React, { useState } from "react";
import sampleImage from "../assets/images/test.png";
import "../assets/components/_report-modal.scss";
import { useTranslation } from "react-i18next";
import Lightbox from "./Lightbox"; // Zoom modal

const ReportModal = ({ record, onClose, onSubmit }) => {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    worker: "",
    workerId: "",
    department: "",
    supervisor: "",
    event: "",
  });

  const [showLightbox, setShowLightbox] = useState(false); // Image Zoom model

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSend = () => {
    const reportData = {
      ...form,
      timestamp: record.timestamp,
      camera: record.camera_id,
      alert_type: record.alert_type,
    };
    onSubmit(reportData);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content report-modal">
        <h4 className="fw-bold mb-3">{t("report_title")}</h4>

        {/* Image View */}
        <div className="image-container mb-3" style={{ position: "relative" }}>
          <img
            src={record.img_url}
            alt="snapshot"
            className="img-fluid"
            onClick={() => setShowLightbox(true)}
            style={{ cursor: "zoom-in", borderRadius: "8px" }}
          />
          <span
            style={{
              position: "absolute",
              bottom: "10px",
              right: "10px",
              fontSize: "1.2rem",
              color: "white",
              padding: "4px 8px",
              borderRadius: "6px",
            }}
          >
            🔍
          </span>
        </div>

        {/* Form */}
        <div className="row mb-3">
          <div className="col">
            <label>{t("worker_name")}</label>
            <input
              type="text"
              className="form-control"
              name="worker"
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label>{t("worker_id")}</label>
            <input
              type="text"
              className="form-control"
              name="workerId"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <label>{t("department")}</label>
            <input
              type="text"
              className="form-control"
              name="department"
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label>{t("supervisor")}</label>
            <input
              type="text"
              className="form-control"
              name="supervisor"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-3">
          <label>{t("event")}</label>
          <select
            name="event"
            className="form-control"
            onChange={handleChange}
          >
            <option value="">{t("select")}</option>
            <option value="No Helmet">{t("no_helmet")}</option>
            <option value="No Vest">{t("no_vest")}</option>
            <option value="No Glass">{t("no_glass")}</option>
            <option value="No Gloves">{t("no_gloves")}</option>
          </select>
        </div>

        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-light" onClick={onClose}>
          {t("cancel")}
          </button>
          <button className="btn btn-primary" onClick={handleSend}>
          {t("send")}
          </button>
        </div>
      </div>

      {/* Open Lightbox */}
      {showLightbox && (
        <Lightbox
          src={sampleImage}
          alt="snapshot"
          onClose={() => setShowLightbox(false)}
        />
      )}
    </div>
  );
};

export default ReportModal;