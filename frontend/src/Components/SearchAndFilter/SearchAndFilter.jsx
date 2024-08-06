import { useState } from "react";
import Location from "../Location/Location";
import Searchbar from "../Searchbar/Searchbar";
import "./SearchAndFilter.css";

const SearchAndFilter = ({ onFilterButtonClick }) => {
  return (
    <div className="searchfilter-container">
      <Location />
      <div className="search-bar-container">
        <Searchbar onFilterButtonClick={onFilterButtonClick} />
      </div>
    </div>
  );
};

export default SearchAndFilter;
