import React from "react";
import "../css/MedicalRecordFilter.css";

const MedicalRecordFilter = ({ selectedFilters, onFilterChange }) => {
  const filters = [
    { label: "Осмотр", value: "Осмотр" },
    { label: "Выписанное лечение", value: "Выписанное лечение" },
    { label: "Анализы", value: "Анализы" },

    { label: "Диагноз", value: "Диагноз" },
  ];

  const handleChange = (event) => {
    const { value, checked } = event.target;
    const updatedFilters = checked
      ? [...selectedFilters, value]
      : selectedFilters.filter((filter) => filter !== value);

    onFilterChange(updatedFilters);
  };

  return (
    <div className="medical-record-filter">
      {filters.map((filter) => (
        <label key={filter.value}>
          <input
            type="checkbox"
            value={filter.value}
            checked={selectedFilters.includes(filter.value)}
            onChange={handleChange}
          />
          {filter.label}
        </label>
      ))}
    </div>
  );
};

export default MedicalRecordFilter;
