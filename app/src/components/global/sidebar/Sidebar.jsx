import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import style from "./Sidebar.module.css";

const Sidebar = ({ onFilter }) => {
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const handleFilter = () => {
    // Pass the selected filters to the onFilter function
    onFilter({
      priceRange,
      selectedType,
      selectedProvince,
      selectedCity,
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

  return (
    <div className={style.sidebar}>
      <div className={style.filter}>
        <h3>Price</h3>

        <Slider
          range
          min={0}
          max={10000}
          step={100}
          value={priceRange}
          onChange={handlePriceChange}
          className={style.slider}
        />
        <div className={style.priceRange}>
          <span className={style.priceMin}>Min: €{priceRange[0]}</span>
          <span className={style.priceMax}>Max: €{priceRange[1]}</span>
        </div>
      </div>
      {/* Rest of the filters */}
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
      <button onClick={handleFilter} className={style.btn}>
        Filter
      </button>
    </div>
  );
};

export default Sidebar;
