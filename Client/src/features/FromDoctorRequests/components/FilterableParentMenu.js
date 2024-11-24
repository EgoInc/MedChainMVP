import React, { useState } from "react";
import "../css/FilterableParentMenu.css";
import Search from "./Search";
import Filter from "./Filter";
import FilterMenu from "./FilterMenu";
import PatientList from "./PatientList";

const FilterableParentMenu = () => {
  const [isFilterVisible, setFilterVisible] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    statuses: [],
  });

  const [searchInput, setSearchInput] = useState("");

  const toggleFilterVisibility = () => {
    setFilterVisible((prev) => !prev);
  };

  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  const handleSearchClick = () => {
    handleFilterChange({ search: searchInput.toLowerCase() });
  };

  return (
    <div className="parent-menu">
      <div className="menu">
        <div className="form">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          ></input>
          <button onClick={handleSearchClick}>
            <Search />
          </button>
          <button onClick={toggleFilterVisibility}>
            <Filter />
          </button>
        </div>

        {isFilterVisible && (
          <FilterMenu filters={filters} onFilterChange={handleFilterChange} />
        )}
      </div>

      <PatientList filters={filters} />
    </div>
  );
};

export default FilterableParentMenu;
