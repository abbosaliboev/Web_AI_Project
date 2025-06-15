// File: components/ViolationRanking.jsx
import React from "react";
import { useTranslation } from "react-i18next";

const ViolationRanking = ({ violationRanking }) => {
      const { t } = useTranslation();
  return (
    <div className="card violation-ranking-card">
      <div className="card-body">
        <h5 className="card-title">{t("rank_title")}</h5>
        <div className="detect-list">
          {violationRanking.map((worker, index) => (
            <div key={index} className="detect-row d-flex justify-content-between mb-2">
              <span>{t("rank_worker_id", { id: worker.id })}</span>
              <span>{worker.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViolationRanking;