import React, { useState } from "react";
import Search from "../../FromDoctorRequests/components/Search";
import "../css/SearchMenu.css";

const SearchMenu = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchText.toLowerCase());
  };

  return (
    <div className="search-menu">
      <input
        type="text"
        value={searchText}
        onChange={handleInputChange}
      ></input>
      <button onClick={handleSearchClick}>
        <Search />
      </button>
    </div>
  );
};

export default SearchMenu;
