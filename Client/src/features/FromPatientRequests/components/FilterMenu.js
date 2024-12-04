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
      <label>
        <input
          type="checkbox"
          value="Запрос доступа"
          checked={filters.statuses.includes("Запрос доступа")}
          onChange={() => handleStatusChange("Запрос доступа")}
        />
        Запрос доступа
      </label>
      <label>
        <input
          type="checkbox"
          value="Изучение мед.карты"
          checked={filters.statuses.includes("Изучение мед.карты")}
          onChange={() => handleStatusChange("Изучение мед.карты")}
        />
        Изучение мед.карты
      </label>
      <label>
        <input
          type="checkbox"
          value="Изменение мед.карты"
          checked={filters.statuses.includes("Изменение мед.карты")}
          onChange={() => handleStatusChange("Изменение мед.карты")}
        />
        Изменение мед.карты
      </label>
    </div>
  );
};

export default FilterMenu;
