import React, { useState } from "react";
import "../assets/components/_report.scss";
import { useTranslation } from "react-i18next";

const ReportPage = () => {
    const { t } = useTranslation();
  const [startDate, setStartDate] = useState("2025-05-10");
  const [endDate, setEndDate] = useState("2025-05-12");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  const [data, setData] = useState([
    { id: 2025041, name: "Kim Su Min", date: "2025.05.12 18:01", status: "ALERT" },
    { id: 2025167, name: "Lee Min Ho", date: "2025.05.12 17:55", status: "ALERT" },
    { id: 2025793, name: "Kang Dong Won", date: "2025.05.12 15:48", status: "ALERT" },
    { id: 2025041, name: "Kim Su Min", date: "2025.05.12 12:42", status: "ALERT" },
    { id: 2025041, name: "Kim Su Min", date: "2025.05.11 13:39", status: "ALERT" },
    { id: 2025793, name: "Kang Dong Won", date: "2025.05.11 10:35", status: "ALERT" },
    { id: 2025167, name: "Lee Min Ho", date: "2025.05.11 08:32", status: "ALERT" },
    { id: 2025041, name: "Kim Su Min", date: "2025.05.10 13:26", status: "ALERT" },
    { id: 2025167, name: "Lee Min Ho", date: "2025.05.10 12:23", status: "ALERT" },
    { id: 2025041, name: "Kim Su Min", date: "2025.05.10 10:55", status: "ALERT" },
    { id: 2025793, name: "Kang Dong Won", date: "2025.05.10 10:32", status: "ALERT" },
    { id: 2025041, name: "Kim Su Min", date: "2025.05.10 09:25", status: "ALERT" },
  ]);

  // Sana formatini YYYY-MM-DD ga o'zgartirish uchun yordamchi funksiya
  const formatDateForComparison = (dateStr) => {
    return dateStr.replace(/\./g, "-").split(" ")[0];
  };

  const filteredData = data.filter((item) => {
    const itemDate = formatDateForComparison(item.date);
    return (
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      itemDate >= startDate &&
      itemDate <= endDate
    );
  });

  const toggleSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === filteredData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredData.map((item) => item.id));
    }
  };

  const toggleAlertStatus = (index) => {
    const updated = [...filteredData];
    const globalIndex = data.findIndex(
      (d) => d.id === updated[index].id && d.date === updated[index].date
    );
    const newData = [...data];
    newData[globalIndex].status =
      newData[globalIndex].status === "ALERT" ? "ALERTED" : "ALERT";
    setData(newData);
  };

  return (
    <div className="search-results-page">
      {/* Header */}
      <div className="summary-header">
        <div className="date-picker">
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            aria-label={t("start_date")}
          />
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate}
            aria-label={t("end_date")}
          />
        </div>
        <div className="button-group">
          <button className="btn">
            <i className="bi bi-bell-fill"></i> {t("alert")}
          </button>
          <button className="btn">
            <i className="bi bi-download"></i> {t("download")}
          </button>
        </div>
      </div>

      {/* Search bar */}
      <div className="search-section">
        <h5 className="fw-bold">{t("search_results")}</h5>
        <input
          type="text"
          placeholder={t("search_placeholder")}
          className="form-control search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label={t("search_input")}
        />
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <div className="table-responsive-x">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>{t("id")}</th>
                <th>{t("name")}</th>
                <th>{t("date")}</th>
                <th>{t("event")}</th>
                <th>{t("notify")}</th>
                <th>
                  <button className="btn btn-light" onClick={handleSelectAll}>
                    {t("select_all")}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, i) => (
                  <tr key={`${item.id}-${item.date}`}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.date}</td>
                    <td>
                      <button className="btn btn-sm btn-secondary">
                        {t("more_info")}
                      </button>
                    </td>
                    <td>
                      <button
                        className={`btn btn-sm ${
                          item.status === "ALERTED" ? "btn-success" : "btn-primary"
                        }`}
                        onClick={() => toggleAlertStatus(i)}
                      >
                        {item.status}
                      </button>
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(item.id)}
                        onChange={() => toggleSelect(item.id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                      {t(".no_results")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;