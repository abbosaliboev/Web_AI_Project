
// File: components/SafetyScoreCard.jsx
import React from "react";
import GaugeChart from "react-gauge-chart";
import icons from "../../assets/constants/icons";
import { useTranslation } from "react-i18next";

const SafetyScoreCard = ({ safetyScore, safetyStats }) => {
  const { t } = useTranslation();
  const getIconSrcByLabel = (label) => {
    const iconMap = {
      [t("safety_label_danger_zone")]: "zone",
      [t("safety_label_no_helmet")]: "helmet",
      [t("safety_label_fire")]: "fire",
      [t("safety_label_fall")]: "fall",
    };
    return icons[iconMap[label]] || null;
  };

  return (
    <div className="card safety-score-card">
      <div className="card-body">
        <div className="header-section">
          <div>
            <h5 className="card-title">{t("safety_score_title")}</h5>
            <small className="text-muted">{t("safety_score_subtitle")}</small>
          </div>
          <span className="score-change">+12%</span>
        </div>
        <div className="gauge-chart">
          <GaugeChart
            id="gauge-chart"
            nrOfLevels={3}
            colors={["red", "orange", "green"]}
            arcWidth={0.3}
            percent={safetyScore}
            textColor="#000"
            needleColor="#000"
          />
        </div>
        <div>
          {safetyStats.length > 0 ? (
            safetyStats.map((stat, index) => {
              const iconSrc = getIconSrcByLabel(stat.label);
              return (
                <div key={index} className="progress-bar-section d-flex align-items-center">
                  <div className="left-icon">
                    {iconSrc && <img src={iconSrc} alt={stat.label} className="me-2" />}
                  </div>
                  <div className="right-progress w-100">
                    <div className="span-section d-flex justify-content-between align-items-center">
                      <span className="safety-text">{t(`safety_label_${stat.label.toLowerCase().replaceAll(" ", "_")}`)}</span>
                      <span className="safety-text">{stat.value}%</span>
                    </div>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${stat.value}%`, backgroundColor: stat.color }}
                        aria-valuenow={stat.value}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-muted">{t("safety_score_no_data")}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SafetyScoreCard;