
// File: components/TrendAnalysisChart.jsx
import React from "react";
import { Line } from "react-chartjs-2";
import { useTranslation } from "react-i18next";

const TrendAnalysisChart = ({ incidentTrendData }) => {
    const { t } = useTranslation();
  return (
    <div className="card trend-analysis-card">
      <div className="card-body">
        <h5 className="card-title">{t("trend_title")}</h5>
        {incidentTrendData.labels && incidentTrendData.labels.length > 0 ? (
          <div className="chart-container">
            <Line
              data={incidentTrendData}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    labels: {
                      font: { size: 16 },
                      color: "black",
                    },
                  },
                },
                scales: {
                  x: { title: { display: true, text: "Day" } },
                  y: { title: { display: true, text: "Incidents" }, beginAtZero: true },
                },
              }}
            />
          </div>
        ) : (
          <p className="text-muted">{t("trend_no_data")}</p>
        )}
        <div className="legend">
          <span className="legend-item zone">{t("trend_legend_danger_zone")}</span>
          <span className="legend-item helmet">{t("trend_legend_no_helmet")}</span>
          <span className="legend-item fire">{t("trend_legend_fire")}</span>
          <span className="legend-item fall">{t("trend_legend_fall")}</span>
        </div>
      </div>
    </div>
  );
};

export default TrendAnalysisChart;