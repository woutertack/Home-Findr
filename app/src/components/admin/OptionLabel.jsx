import React, { useState } from "react";
import style from "./OptionLabel.module.css";

const OptionLabel = () => {
  const [selectedOption, setSelectedOption] = useState("rent");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <div className={style.option}>
      <label
        className={`${style.optionLabel} ${
          selectedOption === "rent" ? style.selectedOption : ""
        }`}
        htmlFor="rentOption"
      >
        For Rent
        <input
          type="radio"
          name="listingType"
          id="rentOption"
          value="rent"
          checked={selectedOption === "rent"}
          onChange={handleOptionChange}
        />
        <div
          className={`${style.line} ${
            selectedOption === "rent" ? style.lineRent : ""
          }`}
        ></div>
      </label>
      <label
        className={`${style.optionLabel} ${
          selectedOption === "sale" ? style.selectedOption : ""
        }`}
        htmlFor="saleOption"
      >
        For Sale
        <input
          type="radio"
          name="listingType"
          id="saleOption"
          value="sale"
          checked={selectedOption === "sale"}
          onChange={handleOptionChange}
        />
        <div
          className={`${style.line} ${
            selectedOption === "sale" ? style.lineSale : ""
          }`}
        ></div>
      </label>
    </div>
  );
};

export default OptionLabel;
