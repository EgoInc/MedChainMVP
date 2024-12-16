import React from "react";
import "../css/FilterMenu.css";

const FilterMenu = ({ filters, onFilterChange }) => {
  const handleStatusChange = (status) => {
    const statuses = filters.statuses.includes(status)
      ? filters.statuses.filter((s) => s !== status)
      : [...filters.statuses, status];
    onFilterChange({ statuses });
  };

  return (
    <div className="filter-menu">
      <div className="filter-menu-inner-container">
        <label>
          <input
            type="checkbox"
            value="ожидание"
            checked={filters.statuses.includes("ожидание")}
            onChange={() => handleStatusChange("ожидание")}
          />
          Ожидание
        </label>
        <label>
          <input
            type="checkbox"
            value="отклонено"
            checked={filters.statuses.includes("отклонено")}
            onChange={() => handleStatusChange("отклонено")}
          />
          Отклонено
        </label>
        <label>
          <input
            type="checkbox"
            value="подтверждено"
            checked={filters.statuses.includes("подтверждено")}
            onChange={() => handleStatusChange("подтверждено")}
          />
          Подтверждено
        </label>
      </div>
    </div>
  );
};

export default FilterMenu;
