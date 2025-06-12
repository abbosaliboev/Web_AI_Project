
// File: components/HeatmapOverview.jsx
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const HeatmapOverview = ({ heatmapData, getHeatmapColor }) => {
      const { t } = useTranslation();
  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(
      (el) => new window.bootstrap.Tooltip(el)
    );
    return () => tooltipList.forEach((tooltip) => tooltip.dispose());
  }, [heatmapData]);

  return (
    <div className="card heatmap-card">
      <div className="card-body">
        <h5 className="card-title">{t("heatmap_title")}</h5>
        {heatmapData.length > 0 ? (
          <div className="heatmap">
            {heatmapData.map((row, rowIndex) => (
              <div key={rowIndex} className="heatmap-row">
                <span>{row[0]}</span>
                <div className="heatmap-cells">
                  {row.slice(1, row.length - 1).map((value, cellIndex) => (
                    <div
                      key={cellIndex}
                      className="heatmap-cell"
                      style={{ backgroundColor: getHeatmapColor(value), border: "1px solid #ccc" }}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      data-bs-title={`${t("heatmap_detections")}: ${value}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted">{t("heatmap.noData")}</p>
        )}
      </div>
    </div>
  );
};

export default HeatmapOverview;