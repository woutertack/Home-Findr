import React, { useState, useEffect } from "react";
import Sidebar from "../../components/global/sidebar/Sidebar";
import CardListing from "../../components/global/cards/listings/CardListing";
import style from "./Buy.module.css";
import useFetch from "../../hooks/useFetch";
import { filterProperties } from "../../components/global/filter/filterProperties";
import {IMG} from "../../consts/Img"

const Buy = () => {
  const { isLoading, data, error, invalidate } = useFetch("/properties");
  const [filteredData, setFilteredData] = useState(null);

  const handleFilter = ({
    priceRange,
    selectedType,
    selectedProvince,
    selectedCity,
    sortOrder,
  }) => {
    const filteredData = filterProperties(data, {
      priceRange,
      selectedType,
      selectedProvince,
      selectedCity,
      sortOrder,
    });
    const filteredType = filteredData.filter(
      (property) => property.saleType === "sale"
    );

    setFilteredData(filteredType);
  };

  useEffect(() => {
    if (data) {
      // Filter initial data by sale type
      const filteredType = data.filter(
        (property) => property.saleType === "sale"
      );
      setFilteredData(filteredType);
    }
  }, [data]);

  return (
    <div className={style.main}>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <Sidebar onFilter={handleFilter} />

          <div className={style.container}>
            {filteredData?.map((property) => (
              <CardListing
                key={property._id}
                src={IMG + property.img}
                alt="buy"
                title={property.title}
                type={property.type}
                price={property.price}
                city={property.city}
                saleType={property.saleType}
                zipcode={property.zipcode}
                province={property.province}
                buildyear={property.buildyear}
                path={`/detail/${property._id}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Buy;
