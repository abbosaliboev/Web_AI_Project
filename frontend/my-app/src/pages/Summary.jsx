// ==== Summary.jsx (Refactored with Components) ====
import React, { useState, useEffect, useCallback } from "react";
import SafetyScoreCard from "../components/Summary/SafetyScoreCard";
import TrendAnalysisChart from "../components/Summary/TrendAnalysisChart";
import IncidentDistributionChart from "../components/Summary/IncidentDistributionChart";
import HeatmapOverview from "../components/Summary/HeatmapOverview";
import ViolationRanking from "../components/Summary/ViolationRanking";
import "../assets/components/_summary.scss";
import { useTranslation } from "react-i18next";

const Summary = () => {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState("2025-02-10");
  const [endDate, setEndDate] = useState("2025-02-19");
  const [incidentTrendData, setIncidentTrendData] = useState({});
  const [incidentDistributionData, setIncidentDistributionData] = useState({});
  const [heatmapData, setHeatmapData] = useState([]);
  const [safetyScore, setSafetyScore] = useState(0.72);
  const [violationRanking, setViolationRanking] = useState([]);
  const [safetyStats, setSafetyStats] = useState([]);

  const dummyData = {
    incidentTrend: {
      labels: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      datasets: [
        { label: "Danger Zone", data: [5, 15, 12, 10, 8, 6], borderColor: "green", fill: false, dates: ["2025-02-11", "2025-02-12", "2025-02-13", "2025-02-14", "2025-02-15", "2025-02-16"] },
        { label: "No Helmet", data: [3, 6, 9, 7, 5, 4], borderColor: "red", fill: false, dates: ["2025-02-11", "2025-02-12", "2025-02-13", "2025-02-14", "2025-02-15", "2025-02-16"] },
        { label: "Fire", data: [2, 4, 6, 8, 5, 3], borderColor: "yellow", fill: false, dates: ["2025-02-11", "2025-02-12", "2025-02-13", "2025-02-14", "2025-02-15", "2025-02-16"] },
        { label: "Fall", data: [6, 8, 12, 4, 3, 8], borderColor: "purple", fill: false, dates: ["2025-02-11", "2025-02-12", "2025-02-13", "2025-02-14", "2025-02-15", "2025-02-16"] },
      ],
    },
    incidentDistribution: {
      labels: ["Danger Zone", "No Helmet", "Fire", "Fall"],
      datasets: [
        {
          data: [5, 8, 2, 3],
          backgroundColor: ["green", "red", "orange", "purple"],
          dates: ["2025-02-12", "2025-02-13", "2025-02-14", "2025-02-15"],
        },
      ],
    },
    heatmap: [
      ["Monday", 31, 20, 15, 40, 30, 38, 45, 30, 31, 20, 15, 40, "2025-02-10"],
      ["Tuesday", 15, 25, 50, 20, 40, 24, 25, 40, 15, 25, 50, 20, "2025-02-11"],
      ["Wednesday", 20, 30, 15, 25, 50, 17, 55, 30, 20, 30, 15, 25, "2025-02-12"],
      ["Thursday", 25, 35, 20, 30, 10, 40, 25, 10, 25, 35, 20, 30, "2025-02-13"],
      ["Friday", 30, 20, 25, 35, 10, 25, 45, 30, 30, 20, 25, 35, "2025-02-14"],
      ["Saturday", 25, 45, 30, 40, 30, 40, 35, 10, 25, 45, 30, 40, "2025-02-15"],
      ["Sunday", 40, 30, 25, 45, 40, 20, 25, 30, 40, 30, 25, 45, "2025-02-16"],
    ],
    safetyScore: 0.72,
    violationRanking: [
      { id: "03", count: 9, date: "2025-02-12" },
      { id: "01", count: 8, date: "2025-02-13" },
    ],
    safetyStats: [
      { label: "Danger Zone", value: 45, color: "green", date: "2025-02-12" },
      { label: "No Helmet", value: 94, color: "red", date: "2025-02-14" },
      { label: "Fire", value: 72, color: "orange", date: "2025-02-15" },
      { label: "Fall", value: 98, color: "purple", date: "2025-02-16" },
    ],
  };

  const filterDataByDate = useCallback(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const filteredTrendData = {
      labels: [],
      datasets: dummyData.incidentTrend.datasets.map(dataset => ({
        ...dataset,
        data: [],
      })),
    };

    dummyData.incidentTrend.labels.forEach((label, index) => {
      const date = new Date(dummyData.incidentTrend.datasets[0].dates[index]);
      if (date >= start && date <= end) {
        filteredTrendData.labels.push(label);
        filteredTrendData.datasets.forEach((dataset, datasetIndex) => {
          dataset.data.push(dummyData.incidentTrend.datasets[datasetIndex].data[index]);
        });
      }
    });
    setIncidentTrendData(filteredTrendData);

    const filteredDistributionData = {
      labels: dummyData.incidentDistribution.labels,
      datasets: [
        {
          ...dummyData.incidentDistribution.datasets[0],
          data: dummyData.incidentDistribution.datasets[0].data.map((value, index) => {
            const date = new Date(dummyData.incidentDistribution.datasets[0].dates[index]);
            return date >= start && date <= end ? value : 0;
          }),
        },
      ],
    };
    setIncidentDistributionData(filteredDistributionData);

    const filteredHeatmapData = dummyData.heatmap.filter(row => {
      const date = new Date(row[row.length - 1]);
      return date >= start && date <= end;
    });
    setHeatmapData(filteredHeatmapData);
    setSafetyScore(dummyData.safetyScore);

    const filteredViolationRanking = dummyData.violationRanking.filter(worker => {
      const date = new Date(worker.date);
      return date >= start && date <= end;
    });
    setViolationRanking(filteredViolationRanking);

    const filteredSafetyStats = dummyData.safetyStats.filter(stat => {
      const date = new Date(stat.date);
      return date >= start && date <= end;
    });
    setSafetyStats(filteredSafetyStats);
  }, [startDate, endDate]);

  useEffect(() => {
    filterDataByDate();
  }, [filterDataByDate]);

  const getHeatmapColor = (value) => {
    if (value > 40) return "#003087";
    if (value > 30) return "#005eb8";
    if (value > 20) return "#4a90e2";
    return "#d3e4fa";
  };

  return (
    <div className="summary-page">
      <div className="summary-header">
        <div className="date-picker">
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate}
          />
        </div>
        <button className="btn">
          <i className="bi bi-download"></i> {t("download")}
        </button>
      </div>
      <div className="row g-4">
        <div className="col-12 col-lg-4">
          <SafetyScoreCard safetyScore={safetyScore} safetyStats={safetyStats} />
        </div>

          {/* Other Cards Column */}
        <div className="col-12 col-lg-8">
          <div className="row g-4">
            {/* Trend Analysis Chart */}
            <div className="col-12 col-md-8">
              <TrendAnalysisChart incidentTrendData={incidentTrendData} />
            </div>

            {/* Incident Distribution */}
            <div className="col-12 col-md-4">
              <IncidentDistributionChart incidentDistributionData={incidentDistributionData} />
            </div>

            {/* Heatmap */}
            <div className="col-12 col-md-8">
              <HeatmapOverview heatmapData={heatmapData} getHeatmapColor={getHeatmapColor} />
            </div>

            {/* Violation Ranking */}
            <div className="col-12 col-md-4">
              <ViolationRanking violationRanking={violationRanking} />
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Summary;