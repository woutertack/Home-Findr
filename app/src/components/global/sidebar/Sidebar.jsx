import { useState } from "react";
import { useLocation } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import style from "./Sidebar.module.css";

const Sidebar = ({ onFilter }) => {
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const location = useLocation();

  // Update the priceMax based on the location's pathname
  let priceMax = 500000;
  let priceStep = 100;
  if (location.pathname.startsWith("/rent")) {
    priceMax = 10000;
    priceStep = 100;
  } else if (location.pathname.startsWith("/buy")) {
    priceMax = 1500000;
    priceStep = 10000;
  }

  const handleFilter = () => {
    // Pass the selected filters and sort order to the onFilter function
    onFilter({
      priceRange,
      selectedType,
      selectedProvince,
      selectedCity,
      sortOrder,
    });
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  return (
    <div className={style.sidebar}>
      <div className={style.filter}>
        <h3>Price</h3>

        <Slider
          range
          min={0}
          max={priceMax}
          step={priceStep}
          value={priceRange}
          onChange={handlePriceChange}
          className={style.slider}
        />
        <div className={style.priceRange}>
          <span className={style.priceMin}>Min: €{priceRange[0]}</span>
          <span className={style.priceMax}>Max: €{priceRange[1]}</span>
        </div>
      </div>
      <div className={style.filter}>
        <h3>Type</h3>
        <select name="type" value={selectedType} onChange={handleTypeChange}>
          <option value="">All</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="garage">Garage</option>
          <option value="office">Office</option>
        </select>
      </div>
      <div className={style.filter}>
        <h3>Province</h3>
        <select
          name="province"
          value={selectedProvince}
          onChange={handleProvinceChange}
        >
          <option value="">All</option>
          <option value="West Flanders">West Flanders</option>
          <option value="East Flanders">East Flanders</option>
          <option value="Antwerp">Antwerp</option>
          <option value="Limburg">Limburg</option>
          <option value="Flemish Brabant">Flemish Brabant</option>
        </select>
      </div>
      <div className={style.filter}>
        <h3>Search by city</h3>
        <input
          className={style.search}
          type="text"
          placeholder="Search by city"
          value={selectedCity}
          onChange={handleCityChange}
        />
      </div>
      <div className={style.filter}>
        <h3>Sort by build year</h3>
        <select value={sortOrder} onChange={handleSortChange}>
          <option value="">None</option>
          <option value="oldToNew">Old to New</option>
          <option value="newToOld">New to Old</option>
        </select>
      </div>
      <button onClick={handleFilter} className={style.btn}>
        Filter
      </button>
    </div>
  );
};

export default Sidebar;
