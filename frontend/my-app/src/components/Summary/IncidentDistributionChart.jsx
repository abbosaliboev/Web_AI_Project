// File: components/IncidentDistributionChart.jsx
import React from "react";
import { Pie } from "react-chartjs-2";
import { useTranslation } from "react-i18next";

const IncidentDistributionChart = ({ incidentDistributionData }) => {
    const { t } = useTranslation();
  return (
    <div className="card distribution-card">
      <div className="card-body">
        <h5 className="card-title">{t("incident_distribution_title")}</h5>
        {incidentDistributionData.datasets && incidentDistributionData.datasets[0].data.some((val) => val > 0) ? (
          <div className="chart-container">
            <Pie
              data={incidentDistributionData}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    labels: { font: { size: 18 }, color: "black" },
                  },
                },
              }}
            />
          </div>
        ) : (
          <p className="text-muted">{t("incident_distribution_no_data")}</p>
        )}
      </div>
    </div>
  );
};

export default IncidentDistributionChart;